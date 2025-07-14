import { type Note, type InsertNote } from "@shared/schema";
import { db } from "../db";

export interface INoteRepository {
  create(note: InsertNote): Promise<Note>;
  update(id: number, updates: Partial<InsertNote>): Promise<Note>;
  getByMeetingId(meetingId: number): Promise<Note[]>;
}

export class NoteRepository implements INoteRepository {
  async create(note: InsertNote): Promise<Note> {
    const newNote = await db.note.create({
      data: note,
    });
    return newNote;
  }

  async update(id: number, updates: Partial<InsertNote>): Promise<Note> {
    const updatedNote = await db.note.update({
      where: { id },
      data: updates,
    });
    return updatedNote;
  }

  async getByMeetingId(meetingId: number): Promise<Note[]> {
    return await db.note.findMany({
      where: { meetingId },
      orderBy: { createdAt: 'desc' },
    });
  }
}