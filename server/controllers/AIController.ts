import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { ICoachingService } from "../core/CoachingService";
import { aiService } from "../services/ai/AIService";
import { insertCoachingSuggestionSchema, MeetingSummarySchema, type MeetingSummary } from "@shared/schema";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";
import { getCacheService, InMemoryCacheService } from "../services/cache";
import crypto from "crypto";

export class AIController {
  private logger: winston.Logger;

  constructor(
    private noteService: INoteService,
    private meetingService: IMeetingService,
    private coachingService: ICoachingService,
    private clientService?: any // Add client service for methodology insights
  ) {
    this.logger = getLogger('AIController');
  }

  async analyzeNotes(req: any, res: Response): Promise<void> {
    try {
      const { meetingId, content } = req.body;
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      // Run AI Analysis and Coaching Generation in parallel for better performance
      this.logger.info("Starting parallel AI operations", { meetingId, userId });
      const startTime = Date.now();
      
      const results = await Promise.allSettled([
        aiService.analyzeNotes(content),
        aiService.generateCoachingSuggestions(content, 'discovery') // Use discovery as default
      ]);
      
      // Extract results with error handling
      const analysis = results[0].status === 'fulfilled' ? results[0].value : null;
      const coachingSuggestions = results[1].status === 'fulfilled' ? results[1].value : null;
      
      // Log any errors
      if (results[0].status === 'rejected') {
        this.logger.error("AI analysis failed", { error: results[0].reason });
      }
      if (results[1].status === 'rejected') {
        this.logger.error("Coaching suggestions generation failed", { error: results[1].reason });
      }
      
      const duration = Date.now() - startTime;
      this.logger.info("AI operations completed", { 
        meetingId, 
        userId, 
        duration,
        hasAnalysis: !!analysis,
        hasCoachingSuggestions: !!coachingSuggestions
      });
      
      // Find the most recent note for this meeting
      const notes = await this.noteService.getNotesByMeetingId(meetingId);
      const latestNote = notes[0];
      
      // Update note with analysis and store coaching suggestions in parallel
      const updateResults = await Promise.allSettled([
        latestNote && analysis ? this.noteService.updateNote(latestNote.id, { aiAnalysis: analysis }) : Promise.resolve(),
        coachingSuggestions ? this.coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId,
          type: 'coaching',
          content: coachingSuggestions
        })) : Promise.resolve()
      ]);
      
      // Log any errors from updates
      updateResults.forEach((result, index) => {
        if (result.status === 'rejected') {
          const operation = index === 0 ? 'note update' : 'coaching suggestion storage';
          this.logger.error(`Failed to complete ${operation}`, { error: result.reason });
        }
      });
      
      // Return both analysis and coaching suggestions
      const response = {
        analysis,
        coachingSuggestions
      };
      this.logger.debug("Sending analysis response", { meetingId, userId, responseKeys: Object.keys(response) });
      res.json(response);
    } catch (error) {
      this.logger.error("Error analyzing notes", { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to analyze notes" });
    }
  }

  async handleChat(req: any, res: any): Promise<void> {
    try {
      const { message, meetingContext, conversationHistory, meetingId, useAllMeetingsContext = false } = req.body;

      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      // Build enhanced context with optional journey history
      let enhancedContext = meetingContext || "";
      let journeyContext: string | undefined;
      if (useAllMeetingsContext && meetingId) {
        // Validate meeting ownership if using journey context
        const userId = req.user?.claims?.sub;
        if (userId) {
          const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
          if (hasAccess) {
            journeyContext = await this.buildClientJourneyContext(meetingId, meetingContext || "");
            enhancedContext = journeyContext;
          }
        }
      }

      // Generate AI response using AI service with journey context
      const response = await aiService.generateChatResponse(message, {
        meetingContext: enhancedContext,
        conversationHistory: conversationHistory || [],
        journeyContext
      });

      res.json({ response });
    } catch (error) {
      this.logger.error("AI chat error", { 
        userId: req.user?.claims?.sub,
        meetingId: req.body?.meetingId,
        hasMessage: !!req.body?.message,
        hasContext: !!req.body?.meetingContext,
        useAllMeetingsContext: req.body?.useAllMeetingsContext,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  }

  async generateCoachingSuggestions(req: any, res: Response): Promise<void> {
    try {
      const { meetingId, content, dealStage, useAllMeetingsContext = false } = req.body;
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      // Build context with optional journey history
      let contextContent = content;
      let journeyContext: string | undefined;
      if (useAllMeetingsContext) {
        journeyContext = await this.buildClientJourneyContext(meetingId, content);
        contextContent = journeyContext;
      }

      const suggestions = await aiService.generateCoachingSuggestions(
        contextContent, 
        dealStage, 
        { journeyContext }
      );
      
      // Store coaching suggestions
      const coachingSuggestionData = insertCoachingSuggestionSchema.parse({
        meetingId,
        type: 'coaching',
        content: suggestions
      });
      
      await this.coachingService.createCoachingSuggestion(coachingSuggestionData);
      
      res.json(suggestions);
    } catch (error) {
      this.logger.error("Error generating coaching suggestions", { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        dealStage: req.body?.dealStage,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to generate coaching suggestions" });
    }
  }

  async generateMethodologyInsights(req: any, res: Response): Promise<void> {
    try {
      const { meetingId, methodology, useAllMeetingsContext = true } = req.body; // Default to true for methodology insights
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      // Get meeting and client data
      const meeting = await this.meetingService.getMeetingById(meetingId);
      if (!meeting) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      // Get all notes for this meeting
      const notes = await this.noteService.getNotesByMeetingId(meetingId);
      const currentNotesContent = notes.map(note => note.content).join('\n\n');

      // Build context with optional journey history (especially important for methodology insights)
      let contextContent = currentNotesContent;
      if (useAllMeetingsContext) {
        contextContent = await this.buildClientJourneyContext(meetingId, currentNotesContent);
      }

      // Get client information (we'll need to add client service later)
      const clientInfo = {
        name: meeting.clientName,
        company: meeting.clientCompany,
        dealType: meeting.dealType,
        // TODO: Add client-specific data like industry, sales methodology, etc.
      };

      // Generate methodology-specific insights with enhanced context
      const insights = await aiService.generateMethodologyInsights(
        methodology,
        clientInfo,
        contextContent,
        meeting
      );
      
      res.json(insights);
    } catch (error) {
      this.logger.error("Error generating methodology insights", { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        methodology: req.body?.methodology,
        useAllMeetingsContext: req.body?.useAllMeetingsContext,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to generate methodology insights" });
    }
  }

  async finalizeTranscription(req: any, res: Response): Promise<void> {
    try {
      const { meetingId, finalText } = req.body;
      
      if (!meetingId || !finalText) {
        res.status(400).json({ message: "Meeting ID and final text are required" });
        return;
      }

      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      // Get existing notes for this meeting
      const existingNotes = await this.noteService.getNotesByMeetingId(meetingId);
      
      // Prepare transcription content with timestamp
      const transcriptionSection = `\n\n--- Call Transcription (${new Date().toLocaleString()}) ---\n${finalText}`;
      
      let noteId: number;
      let updatedContent: string;

      if (existingNotes.length > 0) {
        // Update existing note by appending transcription
        const existingNote = existingNotes[0];
        updatedContent = existingNote.content + transcriptionSection;
        
        await this.noteService.updateNote(existingNote.id, {
          content: updatedContent
        });
        noteId = existingNote.id;
      } else {
        // Create new note with transcription
        updatedContent = `Meeting Notes\n${transcriptionSection}`;
        
        const newNote = await this.noteService.createNote({
          meetingId,
          content: updatedContent,
          aiAnalysis: null
        });
        noteId = newNote.id;
      }

      // Run AI analysis on the updated content and generate meeting summary
      this.logger.info("Running AI analysis and summary generation on finalized transcription", { meetingId, userId });
      const startTime = Date.now();
      
      const results = await Promise.allSettled([
        aiService.analyzeNotes(updatedContent),
        aiService.generateCoachingSuggestions(updatedContent, 'discovery'),
        this.generateMeetingSummary(updatedContent, meetingId)
      ]);
      
      // Extract results with error handling
      const analysis = results[0].status === 'fulfilled' ? results[0].value : null;
      const coachingSuggestions = results[1].status === 'fulfilled' ? results[1].value : null;
      const meetingSummary = results[2].status === 'fulfilled' ? results[2].value : null;
      
      // Log any errors
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          const operations = ['AI analysis', 'coaching suggestions', 'meeting summary'];
          this.logger.error(`${operations[index]} failed`, { error: result.reason });
        }
      });
      
      const duration = Date.now() - startTime;
      this.logger.info("AI analysis and summary generation completed on finalized transcription", { 
        meetingId, 
        userId,
        duration,
        hasAnalysis: !!analysis,
        hasCoachingSuggestions: !!coachingSuggestions,
        hasSummary: !!meetingSummary
      });

      // Update note with AI analysis, store coaching suggestions, and update meeting with summary
      const updateResults = await Promise.allSettled([
        analysis ? this.noteService.updateNote(noteId, { aiAnalysis: analysis }) : Promise.resolve(),
        coachingSuggestions ? this.coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId,
          type: 'transcription_coaching',
          content: coachingSuggestions
        })) : Promise.resolve(),
        meetingSummary ? this.meetingService.updateMeeting(meetingId, { summary: meetingSummary }) : Promise.resolve()
      ]);
      
      // Log any errors from updates
      updateResults.forEach((result, index) => {
        if (result.status === 'rejected') {
          const operations = ['note update', 'coaching suggestion storage', 'meeting summary update'];
          this.logger.error(`Failed to complete ${operations[index]}`, { error: result.reason });
        }
      });

      res.json({
        success: true,
        analysis,
        coachingSuggestions,
        summary: meetingSummary,
        message: "Transcription finalized, analyzed, and summarized successfully"
      });

    } catch (error) {
      this.logger.error("Error finalizing transcription", { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to finalize transcription" });
    }
  }

  /**
   * Build cumulative client journey context using MeetingService helper
   */
  private async buildClientJourneyContext(meetingId: number, currentContent: string = ''): Promise<string> {
    try {
      // Generate cache key based on meeting ID and content hash
      const contentHash = crypto.createHash('md5')
        .update(currentContent.substring(0, 100))
        .digest('hex')
        .substring(0, 8);
      const cacheKey = `journey:context:${meetingId}:${contentHash}`;
      
      // Check cache first
      const cacheService = getCacheService();
      const cached = await cacheService.get<string>(cacheKey);
      if (cached !== null) {
        this.logger.debug("Journey context cache hit", { meetingId, cacheKey });
        return cached;
      }
      
      // Use the new MeetingService helper method for efficiency
      const journeyContext = await this.meetingService.buildClientJourneyContext(meetingId, currentContent);
      
      // Cache the result for 10 minutes
      await cacheService.set(cacheKey, journeyContext, 600);
      
      this.logger.info("Built and cached client journey context", { 
        meetingId,
        hasEnhancedContext: journeyContext.length > currentContent.length,
        cacheKey
      });

      return journeyContext;
    } catch (error) {
      this.logger.error("Error building client journey context", {
        meetingId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return currentContent; // Fallback to current content only
    }
  }

  /**
   * Generate structured meeting summary using AI
   */
  private async generateMeetingSummary(content: string, meetingId: number): Promise<MeetingSummary | null> {
    try {
      // Get meeting to determine deal stage for context
      const meeting = await this.meetingService.getMeetingById(meetingId);
      const dealStage = meeting?.dealType || 'Discovery';

      this.logger.info("Generating meeting summary", { meetingId, dealStage });

      // Use the dedicated meeting summary method
      const summaryResponse = await aiService.generateMeetingSummary(content, dealStage);

      // Validate the AI response
      const validatedSummary = MeetingSummarySchema.parse(summaryResponse);
      
      this.logger.info("Meeting summary generated successfully", { 
        meetingId, 
        dealStage,
        painPointsCount: validatedSummary.pains?.length || 0,
        nextStepsCount: validatedSummary.nextSteps?.length || 0
      });

      return validatedSummary;
    } catch (error) {
      this.logger.error("Error generating meeting summary", {
        meetingId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      return null;
    }
  }
}