import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { ICoachingService } from "../core/CoachingService";
import { aiService } from "../services/ai/AIService";
import { insertCoachingSuggestionSchema, MeetingSummarySchema, type MeetingSummary } from "@shared/schema";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";

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
      
      const [analysis, coachingSuggestions] = await Promise.all([
        aiService.analyzeNotes(content),
        aiService.generateCoachingSuggestions(content, 'discovery') // Use discovery as default
      ]);
      
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
      await Promise.all([
        latestNote ? this.noteService.updateNote(latestNote.id, { aiAnalysis: analysis }) : Promise.resolve(),
        this.coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId,
          type: 'coaching',
          content: coachingSuggestions
        }))
      ]);
      
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
      if (useAllMeetingsContext && meetingId) {
        // Validate meeting ownership if using journey context
        const userId = req.user?.claims?.sub;
        if (userId) {
          const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
          if (hasAccess) {
            enhancedContext = await this.buildClientJourneyContext(meetingId, meetingContext || "");
          }
        }
      }

      // Generate AI response using AI service
      const response = await aiService.generateChatResponse(
        message,
        enhancedContext,
        conversationHistory || []
      );

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
      if (useAllMeetingsContext) {
        contextContent = await this.buildClientJourneyContext(meetingId, content);
      }

      const suggestions = await aiService.generateCoachingSuggestions(contextContent, dealStage);
      
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
      
      const [analysis, coachingSuggestions, meetingSummary] = await Promise.all([
        aiService.analyzeNotes(updatedContent),
        aiService.generateCoachingSuggestions(updatedContent, 'discovery'),
        this.generateMeetingSummary(updatedContent, meetingId)
      ]);
      
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
      await Promise.all([
        this.noteService.updateNote(noteId, { aiAnalysis: analysis }),
        this.coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId,
          type: 'transcription_coaching',
          content: coachingSuggestions
        })),
        meetingSummary ? this.meetingService.updateMeeting(meetingId, { summary: meetingSummary }) : Promise.resolve()
      ]);

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
   * Build cumulative client journey context from meeting summaries
   */
  private async buildClientJourneyContext(meetingId: number, currentContent: string = ''): Promise<string> {
    try {
      const currentMeeting = await this.meetingService.getMeetingById(meetingId);
      if (!currentMeeting || !currentMeeting.clientId) {
        return currentContent;
      }

      // Get all meetings for this client, sorted chronologically
      const allMeetings = await this.meetingService.getMeetingsByUserId(currentMeeting.userId);
      const clientMeetings = allMeetings
        .filter(m => m.clientId === currentMeeting.clientId)
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      if (clientMeetings.length <= 1) {
        // Only current meeting, no journey context to add
        return currentContent;
      }

      // Build journey context from summaries
      let journeyContext = `SALES JOURNEY CONTEXT:\n`;
      journeyContext += `Client: ${currentMeeting.clientName}${currentMeeting.clientCompany ? ` from ${currentMeeting.clientCompany}` : ''}\n`;
      journeyContext += `Journey Progress: ${clientMeetings.length} meetings (${clientMeetings[0].dealType} → ${currentMeeting.dealType})\n\n`;

      // Add summaries from previous meetings (excluding current)
      const previousMeetings = clientMeetings.filter(m => m.id !== meetingId);
      if (previousMeetings.length > 0) {
        journeyContext += `PREVIOUS MEETINGS SUMMARY:\n`;
        
        previousMeetings.forEach((meeting: any, index: number) => {
          const meetingDate = new Date(meeting.createdAt).toLocaleDateString();
          journeyContext += `\n--- Meeting ${index + 1}: ${meeting.dealType} (${meetingDate}) ---\n`;
          
          if (meeting.summary) {
            const summary = meeting.summary as MeetingSummary;
            if (summary.pains?.length > 0) {
              journeyContext += `Pain Points: ${summary.pains.join('; ')}\n`;
            }
            if (summary.progress?.length > 0) {
              journeyContext += `Progress: ${summary.progress.join('; ')}\n`;
            }
            if (summary.nextSteps?.length > 0) {
              journeyContext += `Next Steps: ${summary.nextSteps.join('; ')}\n`;
            }
            if (summary.keyInsights?.length > 0) {
              journeyContext += `Key Insights: ${summary.keyInsights.join('; ')}\n`;
            }
          } else {
            journeyContext += `Summary: Not yet available\n`;
          }
        });
      }

      // Add current meeting content
      journeyContext += `\n--- CURRENT MEETING: ${currentMeeting.dealType} ---\n`;
      if (currentContent) {
        journeyContext += `${currentContent}\n`;
      }

      this.logger.info("Built client journey context", { 
        meetingId, 
        clientId: currentMeeting.clientId,
        totalMeetings: clientMeetings.length,
        previousMeetingsWithSummary: previousMeetings.filter(m => m.summary).length
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