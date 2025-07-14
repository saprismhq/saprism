import { 
  type CoachingSuggestion, 
  type InsertCoachingSuggestion 
} from "@shared/schema";
import { db } from "../db";

export interface ICoachingSuggestionRepository {
  create(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion>;
  getByMeetingId(meetingId: number): Promise<CoachingSuggestion[]>;
  update(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion>;
}

export class CoachingSuggestionRepository implements ICoachingSuggestionRepository {
  async create(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion> {
    const newSuggestion = await db.coachingSuggestion.create({
      data: suggestion,
    });
    return newSuggestion;
  }

  async getByMeetingId(meetingId: number): Promise<CoachingSuggestion[]> {
    return await db.coachingSuggestion.findMany({
      where: { meetingId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion> {
    const updatedSuggestion = await db.coachingSuggestion.update({
      where: { id },
      data: updates,
    });
    return updatedSuggestion;
  }
}