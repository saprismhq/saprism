import { 
  type Meeting, 
  type InsertMeeting, 
  type MeetingWithNotes 
} from "@shared/schema";
import { db } from "../db";

export interface IMeetingRepository {
  create(meeting: InsertMeeting): Promise<Meeting>;
  getById(id: number): Promise<MeetingWithNotes | undefined>;
  getByUserId(userId: string): Promise<Meeting[]>;
  update(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;
}

export class MeetingRepository implements IMeetingRepository {
  async create(meeting: InsertMeeting): Promise<Meeting> {
    const newMeeting = await db.meeting.create({
      data: meeting,
    });
    return newMeeting;
  }

  async getById(id: number): Promise<MeetingWithNotes | undefined> {
    const meeting = await db.meeting.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        coachingSuggestions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return meeting || undefined;
  }

  async getByUserId(userId: string): Promise<Meeting[]> {
    return await db.meeting.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, updates: Partial<InsertMeeting>): Promise<Meeting> {
    const updatedMeeting = await db.meeting.update({
      where: { id },
      data: updates,
    });
    return updatedMeeting;
  }
}