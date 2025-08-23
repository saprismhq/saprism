import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { ICoachingService } from "../core/CoachingService";
import { openaiService } from "../services/openai";
import { insertCoachingSuggestionSchema } from "@shared/schema";

export class AIController {
  constructor(
    private noteService: INoteService,
    private meetingService: IMeetingService,
    private coachingService: ICoachingService
  ) {}

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
      console.log("Starting parallel AI operations...");
      const startTime = Date.now();
      
      const [analysis, coachingSuggestions] = await Promise.all([
        openaiService.analyzeNotes(content),
        openaiService.generateCoachingSuggestions(content, 'discovery') // Use discovery as default
      ]);
      
      console.log(`AI operations completed in ${Date.now() - startTime}ms`);
      console.log("Analysis result:", analysis);
      console.log("Coaching suggestions result:", coachingSuggestions);
      
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
      console.log("Sending response:", response);
      res.json(response);
    } catch (error) {
      console.error("Error analyzing notes:", error);
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

      // Generate AI response using OpenAI service
      const response = await openaiService.generateChatResponse(
        message,
        meetingContext || "",
        conversationHistory || []
      );

      res.json({ response });
    } catch (error) {
      console.error("AI chat error:", error);
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

      const suggestions = await openaiService.generateCoachingSuggestions(contextContent, dealStage);
      
      // Store coaching suggestions
      const coachingSuggestionData = insertCoachingSuggestionSchema.parse({
        meetingId,
        type: 'coaching',
        content: suggestions
      });
      
      await this.coachingService.createCoachingSuggestion(coachingSuggestionData);
      
      res.json(suggestions);
    } catch (error) {
      console.error("Error generating coaching suggestions:", error);
      res.status(500).json({ message: "Failed to generate coaching suggestions" });
    }
  }
}