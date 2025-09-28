import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { ICoachingService } from "../core/CoachingService";
import { aiService } from "../services/ai/AIService";
import { insertCoachingSuggestionSchema } from "@shared/schema";
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
      const { message, meetingContext, conversationHistory } = req.body;

      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      // Generate AI response using AI service
      const response = await aiService.generateChatResponse(
        message,
        meetingContext || "",
        conversationHistory || []
      );

      res.json({ response });
    } catch (error) {
      this.logger.error("AI chat error", { 
        userId: req.user?.claims?.sub,
        hasMessage: !!message,
        hasContext: !!meetingContext,
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

      let contextContent = content;

      // If using all meetings context, build accumulated context
      if (useAllMeetingsContext) {
        const currentMeeting = await this.meetingService.getMeetingById(meetingId);
        if (currentMeeting) {
          // Get all meetings for this client
          const allMeetings = await this.meetingService.getMeetingsByUserId(userId);
          const clientMeetings = allMeetings.filter(m => m.clientId === currentMeeting.clientId);
          
          // Build accumulated context from all meetings
          let accumulatedContext = `Client: ${currentMeeting.clientName}${currentMeeting.clientCompany ? ` from ${currentMeeting.clientCompany}` : ''}\n`;
          accumulatedContext += `Deal Type: ${currentMeeting.dealType || 'Not specified'}\n\n`;
          accumulatedContext += `Meeting History (${clientMeetings.length} meetings):\n`;
          
          clientMeetings
            .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .forEach((meeting: any, index: number) => {
              accumulatedContext += `\n--- Meeting ${index + 1} (${new Date(meeting.createdAt).toLocaleDateString()}) ---\n`;
              // Get notes for this meeting
              // Note: We'd need to modify this to include notes, but for now use available content
              if (meeting.id === meetingId) {
                accumulatedContext += `Notes: ${content}\n`;
              }
            });
          
          contextContent = accumulatedContext;
        }
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
      const { meetingId, methodology } = req.body;
      
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
      const allNotesContent = notes.map(note => note.content).join('\n\n');

      // Get client information (we'll need to add client service later)
      const clientInfo = {
        name: meeting.clientName,
        company: meeting.clientCompany,
        dealType: meeting.dealType,
        // TODO: Add client-specific data like industry, sales methodology, etc.
      };

      // Generate methodology-specific insights
      const insights = await aiService.generateMethodologyInsights(
        methodology,
        clientInfo,
        allNotesContent,
        meeting
      );
      
      res.json(insights);
    } catch (error) {
      this.logger.error("Error generating methodology insights", { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        methodology: req.body?.methodology,
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

      // Run AI analysis on the updated content
      this.logger.info("Running AI analysis on finalized transcription", { meetingId, userId });
      const startTime = Date.now();
      
      const [analysis, coachingSuggestions] = await Promise.all([
        aiService.analyzeNotes(updatedContent),
        aiService.generateCoachingSuggestions(updatedContent, 'discovery')
      ]);
      
      const duration = Date.now() - startTime;
      this.logger.info("AI analysis completed on finalized transcription", { 
        meetingId, 
        userId,
        duration,
        hasAnalysis: !!analysis,
        hasCoachingSuggestions: !!coachingSuggestions
      });

      // Update note with AI analysis and store coaching suggestions
      await Promise.all([
        this.noteService.updateNote(noteId, { aiAnalysis: analysis }),
        this.coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId,
          type: 'transcription_coaching',
          content: coachingSuggestions
        }))
      ]);

      res.json({
        success: true,
        analysis,
        coachingSuggestions,
        message: "Transcription finalized and analyzed successfully"
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
}