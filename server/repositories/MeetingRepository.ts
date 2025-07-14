import { 
  meetings, 
  notes, 
  coachingSuggestions,
  type Meeting, 
  type InsertMeeting, 
  type MeetingWithNotes 
} from "@shared/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export interface IMeetingRepository {
  create(meeting: InsertMeeting): Promise<Meeting>;
  getById(id: number): Promise<MeetingWithNotes | undefined>;
  getByUserId(userId: string): Promise<Meeting[]>;
  update(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;
}

export class MeetingRepository implements IMeetingRepository {
  async create(meeting: InsertMeeting): Promise<Meeting> {
    const [newMeeting] = await db
      .insert(meetings)
      .values(meeting)
      .returning();
    return newMeeting;
  }

  async getById(id: number): Promise<MeetingWithNotes | undefined> {
    const [meeting] = await db
      .select()
      .from(meetings)
      .where(eq(meetings.id, id));

    if (!meeting) {
      return undefined;
    }

    const meetingNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.meetingId, id))
      .orderBy(desc(notes.createdAt));

    const suggestions = await db
      .select()
      .from(coachingSuggestions)
      .where(eq(coachingSuggestions.meetingId, id))
      .orderBy(desc(coachingSuggestions.createdAt));

    return {
      ...meeting,
      notes: meetingNotes,
      coachingSuggestions: suggestions,
    };
  }

  async getByUserId(userId: string): Promise<Meeting[]> {
    return await db
      .select()
      .from(meetings)
      .where(eq(meetings.userId, userId))
      .orderBy(desc(meetings.createdAt));
  }

  async update(id: number, updates: Partial<InsertMeeting>): Promise<Meeting> {
    const [updatedMeeting] = await db
      .update(meetings)
      .set(updates)
      .where(eq(meetings.id, id))
      .returning();
    return updatedMeeting;
  }
}