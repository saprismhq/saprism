import { notes, type Note, type InsertNote } from "@shared/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export interface INoteRepository {
  create(note: InsertNote): Promise<Note>;
  update(id: number, updates: Partial<InsertNote>): Promise<Note>;
  getByMeetingId(meetingId: number): Promise<Note[]>;
}

export class NoteRepository implements INoteRepository {
  async create(note: InsertNote): Promise<Note> {
    const [newNote] = await db
      .insert(notes)
      .values(note)
      .returning();
    return newNote;
  }

  async update(id: number, updates: Partial<InsertNote>): Promise<Note> {
    const [updatedNote] = await db
      .update(notes)
      .set(updates)
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  }

  async getByMeetingId(meetingId: number): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.meetingId, meetingId))
      .orderBy(desc(notes.createdAt));
  }
}