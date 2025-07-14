import { 
  coachingSuggestions, 
  type CoachingSuggestion, 
  type InsertCoachingSuggestion 
} from "@shared/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export interface ICoachingSuggestionRepository {
  create(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion>;
  getByMeetingId(meetingId: number): Promise<CoachingSuggestion[]>;
  update(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion>;
}

export class CoachingSuggestionRepository implements ICoachingSuggestionRepository {
  async create(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion> {
    const [newSuggestion] = await db
      .insert(coachingSuggestions)
      .values(suggestion)
      .returning();
    return newSuggestion;
  }

  async getByMeetingId(meetingId: number): Promise<CoachingSuggestion[]> {
    return await db
      .select()
      .from(coachingSuggestions)
      .where(eq(coachingSuggestions.meetingId, meetingId))
      .orderBy(desc(coachingSuggestions.createdAt));
  }

  async update(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion> {
    const [updatedSuggestion] = await db
      .update(coachingSuggestions)
      .set(updates)
      .where(eq(coachingSuggestions.id, id))
      .returning();
    return updatedSuggestion;
  }
}