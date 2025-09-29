import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { insertNoteSchema } from "@shared/schema";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";
import { CacheManager } from "../services/cache";

export class NoteController {
  private logger: winston.Logger;
  
  constructor(
    private noteService: INoteService,
    private meetingService: IMeetingService
  ) {
    this.logger = getLogger('NoteController');
  }

  async getNotesByMeeting(req: any, res: Response): Promise<void> {
    try {
      const meetingId = parseInt(req.query.meetingId as string);
      
      if (!meetingId) {
        res.status(400).json({ message: "Meeting ID is required" });
        return;
      }

      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const notes = await this.noteService.getNotesByMeetingId(meetingId);
      res.json(notes);
    } catch (error) {
      this.logger.error('Error getting notes', { 
        meetingId: parseInt(req.query.meetingId as string),
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to get notes" });
    }
  }

  async createNote(req: any, res: Response): Promise<void> {
    try {
      const noteData = insertNoteSchema.parse(req.body);
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(noteData.meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const note = await this.noteService.createNote(noteData);
      
      // Invalidate cache for this meeting's journey context
      await CacheManager.invalidate([`journey:context:${noteData.meetingId}:*`]);
      
      res.json(note);
    } catch (error) {
      this.logger.error('Error creating note', { 
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to create note" });
    }
  }

  async updateNote(req: any, res: Response): Promise<void> {
    try {
      const noteId = parseInt(req.params.id);
      const updates = req.body;
      
      const note = await this.noteService.updateNote(noteId, updates);
      
      // Invalidate cache for this meeting's journey context and AI analysis
      if (note?.meetingId) {
        await CacheManager.invalidate([
          `journey:context:${note.meetingId}:*`,
          `ai:analysis:*`,
          `ai:coaching:*`
        ]);
      }
      
      res.json(note);
    } catch (error) {
      this.logger.error('Error updating note', { 
        noteId: parseInt(req.params.id),
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to update note" });
    }
  }
}