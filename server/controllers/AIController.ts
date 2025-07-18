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

  async generateCoachingSuggestions(req: any, res: Response): Promise<void> {
    try {
      const { meetingId, content, dealStage } = req.body;
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const suggestions = await openaiService.generateCoachingSuggestions(content, dealStage);
      
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