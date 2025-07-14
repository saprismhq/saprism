import { type CoachingSuggestion, type InsertCoachingSuggestion } from "@shared/schema";
import { ICoachingSuggestionRepository } from "../repositories/CoachingSuggestionRepository";

export interface ICoachingService {
  createCoachingSuggestion(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion>;
  getCoachingSuggestionsByMeetingId(meetingId: number): Promise<CoachingSuggestion[]>;
  updateCoachingSuggestion(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion>;
}

export class CoachingService implements ICoachingService {
  constructor(private coachingSuggestionRepository: ICoachingSuggestionRepository) {}

  async createCoachingSuggestion(suggestion: InsertCoachingSuggestion): Promise<CoachingSuggestion> {
    return await this.coachingSuggestionRepository.create(suggestion);
  }

  async getCoachingSuggestionsByMeetingId(meetingId: number): Promise<CoachingSuggestion[]> {
    return await this.coachingSuggestionRepository.getByMeetingId(meetingId);
  }

  async updateCoachingSuggestion(id: number, updates: Partial<InsertCoachingSuggestion>): Promise<CoachingSuggestion> {
    return await this.coachingSuggestionRepository.update(id, updates);
  }
}