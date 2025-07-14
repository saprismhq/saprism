import {
  users,
  meetings,
  notes,
  coachingSuggestions,
  crmSyncLogs,
  type User,
  type UpsertUser,
  type Meeting,
  type InsertMeeting,
  type Note,
  type InsertNote,
  type CoachingSuggestion,
  type InsertCoachingSuggestion,
  type CrmSyncLog,
  type InsertCrmSyncLog,
  type MeetingWithNotes,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Meeting operations
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getMeeting(id: number): Promise<MeetingWithNotes | undefined>;
  getMeetingsByUser(userId: string): Promise<Meeting[]>;
  updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;

  // Notes operations
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: number, updates: Partial<InsertNote>): Promise<Note>;
  getNotesByMeeting(meetingId: number): Promise<Note[]>;

  // Coaching suggestions operations
  createCoachingSuggestion(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion>;
  getCoachingSuggestionsByMeeting(meetingId: number): Promise<CoachingSuggestion[]>;
  updateCoachingSuggestion(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion>;

  // CRM sync operations
  createCrmSyncLog(log: InsertCrmSyncLog): Promise<CrmSyncLog>;
  getCrmSyncLogsByMeeting(meetingId: number): Promise<CrmSyncLog[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Meeting operations
  async createMeeting(meeting: InsertMeeting): Promise<Meeting> {
    const [newMeeting] = await db
      .insert(meetings)
      .values(meeting)
      .returning();
    return newMeeting;
  }

  async getMeeting(id: number): Promise<MeetingWithNotes | undefined> {
    const [meeting] = await db.select().from(meetings).where(eq(meetings.id, id));
    if (!meeting) return undefined;

    const meetingNotes = await db.select().from(notes).where(eq(notes.meetingId, id));
    const suggestions = await db.select().from(coachingSuggestions).where(eq(coachingSuggestions.meetingId, id));

    return {
      ...meeting,
      notes: meetingNotes,
      coachingSuggestions: suggestions,
    };
  }

  async getMeetingsByUser(userId: string): Promise<Meeting[]> {
    return await db
      .select()
      .from(meetings)
      .where(eq(meetings.userId, userId))
      .orderBy(desc(meetings.meetingDate));
  }

  async updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting> {
    const [updatedMeeting] = await db
      .update(meetings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(meetings.id, id))
      .returning();
    return updatedMeeting;
  }

  // Notes operations
  async createNote(note: InsertNote): Promise<Note> {
    const [newNote] = await db
      .insert(notes)
      .values(note)
      .returning();
    return newNote;
  }

  async updateNote(id: number, updates: Partial<InsertNote>): Promise<Note> {
    const [updatedNote] = await db
      .update(notes)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  }

  async getNotesByMeeting(meetingId: number): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.meetingId, meetingId))
      .orderBy(desc(notes.createdAt));
  }

  // Coaching suggestions operations
  async createCoachingSuggestion(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion> {
    const [newSuggestion] = await db
      .insert(coachingSuggestions)
      .values(suggestion)
      .returning();
    return newSuggestion;
  }

  async getCoachingSuggestionsByMeeting(meetingId: number): Promise<CoachingSuggestion[]> {
    return await db
      .select()
      .from(coachingSuggestions)
      .where(eq(coachingSuggestions.meetingId, meetingId))
      .orderBy(desc(coachingSuggestions.createdAt));
  }

  async updateCoachingSuggestion(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion> {
    const [updatedSuggestion] = await db
      .update(coachingSuggestions)
      .set(updates)
      .where(eq(coachingSuggestions.id, id))
      .returning();
    return updatedSuggestion;
  }

  // CRM sync operations
  async createCrmSyncLog(log: InsertCrmSyncLog): Promise<CrmSyncLog> {
    const [newLog] = await db
      .insert(crmSyncLogs)
      .values(log)
      .returning();
    return newLog;
  }

  async getCrmSyncLogsByMeeting(meetingId: number): Promise<CrmSyncLog[]> {
    return await db
      .select()
      .from(crmSyncLogs)
      .where(eq(crmSyncLogs.meetingId, meetingId))
      .orderBy(desc(crmSyncLogs.createdAt));
  }
}

export const storage = new DatabaseStorage();
