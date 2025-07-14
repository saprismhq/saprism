import { type Meeting, type InsertMeeting, type MeetingWithNotes } from "@shared/schema";
import { IMeetingRepository } from "../repositories/MeetingRepository";

export interface IMeetingService {
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getMeetingById(id: number): Promise<MeetingWithNotes | undefined>;
  getMeetingsByUserId(userId: string): Promise<Meeting[]>;
  updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;
  validateMeetingOwnership(meetingId: number, userId: string): Promise<boolean>;
}

export class MeetingService implements IMeetingService {
  constructor(private meetingRepository: IMeetingRepository) {}

  async createMeeting(meeting: InsertMeeting): Promise<Meeting> {
    return await this.meetingRepository.create(meeting);
  }

  async getMeetingById(id: number): Promise<MeetingWithNotes | undefined> {
    return await this.meetingRepository.getById(id);
  }

  async getMeetingsByUserId(userId: string): Promise<Meeting[]> {
    return await this.meetingRepository.getByUserId(userId);
  }

  async updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting> {
    return await this.meetingRepository.update(id, updates);
  }

  async validateMeetingOwnership(meetingId: number, userId: string): Promise<boolean> {
    const meeting = await this.meetingRepository.getById(meetingId);
    return meeting?.userId === userId;
  }
}