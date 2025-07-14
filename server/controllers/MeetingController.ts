import { Request, Response } from "express";
import { IMeetingService } from "../core/MeetingService";
import { insertMeetingSchema } from "@shared/schema";

export class MeetingController {
  constructor(private meetingService: IMeetingService) {}

  async createMeeting(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      const meetingData = insertMeetingSchema.parse({ ...req.body, userId });
      
      const meeting = await this.meetingService.createMeeting(meetingData);
      res.json(meeting);
    } catch (error) {
      console.error("Error creating meeting:", error);
      res.status(500).json({ message: "Failed to create meeting" });
    }
  }

  async getMeetings(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      const meetings = await this.meetingService.getMeetingsByUserId(userId);
      res.json(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  }

  async getMeetingById(req: any, res: Response): Promise<void> {
    try {
      const meetingId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const meeting = await this.meetingService.getMeetingById(meetingId);
      
      if (!meeting) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      // Check ownership
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      res.json(meeting);
    } catch (error) {
      console.error("Error fetching meeting:", error);
      res.status(500).json({ message: "Failed to fetch meeting" });
    }
  }
}