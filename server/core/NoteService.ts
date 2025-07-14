import { type Note, type InsertNote } from "@shared/schema";
import { INoteRepository } from "../repositories/NoteRepository";

export interface INoteService {
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: number, updates: Partial<InsertNote>): Promise<Note>;
  getNotesByMeetingId(meetingId: number): Promise<Note[]>;
}

export class NoteService implements INoteService {
  constructor(private noteRepository: INoteRepository) {}

  async createNote(note: InsertNote): Promise<Note> {
    return await this.noteRepository.create(note);
  }

  async updateNote(id: number, updates: Partial<InsertNote>): Promise<Note> {
    return await this.noteRepository.update(id, updates);
  }

  async getNotesByMeetingId(meetingId: number): Promise<Note[]> {
    return await this.noteRepository.getByMeetingId(meetingId);
  }
}