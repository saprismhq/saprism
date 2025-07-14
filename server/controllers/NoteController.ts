import { Request, Response } from "express";
import { INoteService } from "../core/NoteService";
import { IMeetingService } from "../core/MeetingService";
import { insertNoteSchema } from "@shared/schema";

export class NoteController {
  constructor(
    private noteService: INoteService,
    private meetingService: IMeetingService
  ) {}

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
      res.json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ message: "Failed to create note" });
    }
  }

  async updateNote(req: any, res: Response): Promise<void> {
    try {
      const noteId = parseInt(req.params.id);
      const updates = req.body;
      
      const note = await this.noteService.updateNote(noteId, updates);
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Failed to update note" });
    }
  }
}