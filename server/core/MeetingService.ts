import { type Meeting, type InsertMeeting, type MeetingWithSessions, type MeetingSummary } from "@shared/schema";
import { IMeetingRepository } from "../repositories/MeetingRepository";

export interface IMeetingService {
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getMeetingById(id: number): Promise<MeetingWithSessions | undefined>;
  getMeetingsByUserId(userId: string): Promise<Meeting[]>;
  getMeetingsByClientId(clientId: number, userId: string): Promise<Meeting[]>;
  updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting>;
  deleteMeeting(id: number): Promise<void>;
  validateMeetingOwnership(meetingId: number, userId: string): Promise<boolean>;
  buildClientJourneyContext(meetingId: number, currentContent?: string): Promise<string>;
}

export class MeetingService implements IMeetingService {
  constructor(private meetingRepository: IMeetingRepository) {}

  async createMeeting(meeting: InsertMeeting): Promise<Meeting> {
    return await this.meetingRepository.create(meeting);
  }

  async getMeetingById(id: number): Promise<MeetingWithSessions | undefined> {
    return await this.meetingRepository.getById(id);
  }

  async getMeetingsByUserId(userId: string): Promise<Meeting[]> {
    return await this.meetingRepository.getByUserId(userId);
  }

  async updateMeeting(id: number, updates: Partial<InsertMeeting>): Promise<Meeting> {
    return await this.meetingRepository.update(id, updates);
  }

  async deleteMeeting(id: number): Promise<void> {
    return await this.meetingRepository.delete(id);
  }

  async validateMeetingOwnership(meetingId: number, userId: string): Promise<boolean> {
    // Use optimized query for ownership validation (no need for relations)
    const meeting = await this.meetingRepository.getBasicById(meetingId);
    return meeting?.userId === userId;
  }

  async getMeetingsByClientId(clientId: number, userId: string): Promise<Meeting[]> {
    return await this.meetingRepository.getByClientId(clientId, userId);
  }

  /**
   * Build cumulative client journey context from meeting summaries
   */
  async buildClientJourneyContext(meetingId: number, currentContent: string = ''): Promise<string> {
    try {
      // Use optimized query to get basic meeting info only (no relations)
      const currentMeeting = await this.meetingRepository.getBasicById(meetingId);
      if (!currentMeeting || !currentMeeting.clientId) {
        return currentContent;
      }

      // Get only meeting summaries (limited to last 5 meetings for performance)
      const clientMeetingSummaries = await this.meetingRepository.getClientMeetingSummaries(
        currentMeeting.clientId, 
        currentMeeting.userId,
        5 // Limit to last 5 meetings for performance
      );

      if (clientMeetingSummaries.length <= 1) {
        // Only current meeting, no journey context to add
        return currentContent;
      }

      // Reverse to get chronological order (oldest first)
      const chronologicalMeetings = clientMeetingSummaries.reverse();

      // Build journey context from summaries
      let journeyContext = `SALES JOURNEY CONTEXT:\n`;
      journeyContext += `Client: ${currentMeeting.clientName}${currentMeeting.clientCompany ? ` from ${currentMeeting.clientCompany}` : ''}\n`;
      journeyContext += `Journey Progress: ${chronologicalMeetings.length} recent meetings (${chronologicalMeetings[0].dealType} → ${currentMeeting.dealType})\n\n`;

      // Add summaries from previous meetings (excluding current)
      const previousMeetings = chronologicalMeetings.filter(m => m.id !== meetingId);
      if (previousMeetings.length > 0) {
        journeyContext += `PREVIOUS MEETINGS SUMMARY:\n`;
        
        previousMeetings.forEach((meeting, index: number) => {
          const meetingDate = new Date(meeting.createdAt).toLocaleDateString();
          journeyContext += `\n--- Meeting ${index + 1}: ${meeting.dealType} (${meetingDate}) ---\n`;
          
          if (meeting.summary) {
            const summary = meeting.summary as MeetingSummary;
            if (summary.pains?.length > 0) {
              journeyContext += `Pain Points: ${summary.pains.join('; ')}\n`;
            }
            if (summary.progress?.length > 0) {
              journeyContext += `Progress: ${summary.progress.join('; ')}\n`;
            }
            if (summary.nextSteps?.length > 0) {
              journeyContext += `Next Steps: ${summary.nextSteps.join('; ')}\n`;
            }
            if (summary.keyInsights?.length > 0) {
              journeyContext += `Key Insights: ${summary.keyInsights.join('; ')}\n`;
            }
          } else {
            journeyContext += `Summary: Not yet available\n`;
          }
        });
      }

      // Add current meeting content
      journeyContext += `\n--- CURRENT MEETING: ${currentMeeting.dealType} ---\n`;
      if (currentContent) {
        journeyContext += `${currentContent}\n`;
      }

      return journeyContext;
    } catch (error) {
      // Fallback to current content only on error
      return currentContent;
    }
  }
}