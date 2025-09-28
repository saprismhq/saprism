import { 
  type Meeting, 
  type InsertMeeting, 
  type MeetingWithSessions 
} from "@shared/schema";
import { db } from "../db";

export interface IMeetingRepository {
  create(meeting: InsertMeeting): Promise<Meeting>;
  getById(id: number): Promise<MeetingWithSessions | undefined>;
  getByUserId(userId: string): Promise<Meeting[]>;
  getByClientId(clientId: number, userId: string): Promise<Meeting[]>;
  update(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;
  delete(id: number): Promise<void>;
  // Optimized methods for journey context
  getBasicById(id: number): Promise<{ id: number; clientId: number | null; userId: string; clientName: string; clientCompany: string | null; dealType: string } | undefined>;
  getClientMeetingSummaries(clientId: number, userId: string, limit?: number): Promise<{ id: number; summary: any; dealType: string; createdAt: Date }[]>;
}

export class MeetingRepository implements IMeetingRepository {
  async create(meeting: InsertMeeting): Promise<Meeting> {
    const newMeeting = await db.meeting.create({
      data: meeting,
    });
    return newMeeting;
  }

  async getById(id: number): Promise<MeetingWithSessions | undefined> {
    const meeting = await db.meeting.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        coachingSuggestions: {
          orderBy: { createdAt: 'desc' },
        },
        // callSessions: {
        //   orderBy: { createdAt: 'desc' },
        // },
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

  async delete(id: number): Promise<void> {
    await db.meeting.delete({
      where: { id },
    });
  }

  async getByClientId(clientId: number, userId: string): Promise<Meeting[]> {
    return await db.meeting.findMany({
      where: { 
        clientId,
        userId 
      },
      orderBy: { createdAt: 'asc' }, // Chronological order for journey context
    });
  }

  // Optimized method to get basic meeting info without relations
  async getBasicById(id: number): Promise<{ id: number; clientId: number | null; userId: string; clientName: string; clientCompany: string | null; dealType: string } | undefined> {
    const meeting = await db.meeting.findUnique({
      where: { id },
      select: {
        id: true,
        clientId: true,
        userId: true,
        clientName: true,
        clientCompany: true,
        dealType: true,
      },
    });
    return meeting || undefined;
  }

  // Optimized method to get only meeting summaries for journey context
  async getClientMeetingSummaries(clientId: number, userId: string, limit: number = 5): Promise<{ id: number; summary: any; dealType: string; createdAt: Date }[]> {
    return await db.meeting.findMany({
      where: { 
        clientId,
        userId 
      },
      select: {
        id: true,
        summary: true,
        dealType: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }, // Most recent first, then we'll reverse for chronological
      take: limit, // Limit to last N meetings for performance
    });
  }
}