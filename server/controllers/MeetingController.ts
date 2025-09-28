import { Request, Response } from "express";
import { IMeetingService } from "../core/MeetingService";
import { CreateMeetingSchema } from "@shared/schema";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";

export class MeetingController {
  private logger: winston.Logger;
  
  constructor(private meetingService: IMeetingService) {
    this.logger = getLogger('MeetingController');
  }

  async createMeeting(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      
      // Parse the request body using the frontend schema
      const requestData = CreateMeetingSchema.parse(req.body);
      
      // Transform to internal meeting format
      const meetingData = {
        userId,
        clientId: requestData.clientId || null,
        clientName: requestData.clientName,
        clientCompany: requestData.clientCompany || null,
        dealType: requestData.dealType || "Connect",
        status: "active"
      };
      
      const meeting = await this.meetingService.createMeeting(meetingData);
      res.json(meeting);
    } catch (error) {
      this.logger.error('Error creating meeting', { 
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      if (error instanceof Error) {
        // Error details already included in structured logging above
      }
      res.status(500).json({ message: "Failed to create meeting" });
    }
  }

  async getMeetings(req: any, res: Response): Promise<void> {
    try {
      const userId = req.user.claims.sub;
      const meetings = await this.meetingService.getMeetingsByUserId(userId);
      res.json(meetings);
    } catch (error) {
      this.logger.error('Error fetching meetings', { 
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
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
      this.logger.error('Error fetching meeting', { 
        meetingId: parseInt(req.params.id),
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to fetch meeting" });
    }
  }

  async deleteMeeting(req: any, res: Response): Promise<void> {
    try {
      const meetingId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Validate meeting ownership
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }
      
      await this.meetingService.deleteMeeting(meetingId);
      res.json({ message: "Meeting deleted successfully" });
    } catch (error) {
      this.logger.error('Error deleting meeting', { 
        meetingId: parseInt(req.params.id),
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to delete meeting" });
    }
  }
}