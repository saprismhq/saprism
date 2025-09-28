import { Request, Response } from "express";
import { IMeetingService } from "../core/MeetingService";
import { INoteService } from "../core/NoteService";
import { ICrmSyncService } from "../core/CrmSyncService";
import { salesforceService } from "../services/salesforce";
import { getLogger } from "../utils/LoggerFactory";
import winston from "winston";

export class CrmController {
  private logger: winston.Logger;
  
  constructor(
    private meetingService: IMeetingService,
    private noteService: INoteService,
    private crmSyncService: ICrmSyncService
  ) {
    this.logger = getLogger('CrmController');
  }

  async getCrmStatus(req: any, res: Response): Promise<void> {
    try {
      const status = await salesforceService.testConnection();
      res.json(status);
    } catch (error) {
      this.logger.error("Error checking CRM status", { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ message: "Failed to check CRM status" });
    }
  }

  async syncToCrm(req: any, res: Response): Promise<void> {
    try {
      const { meetingId } = req.body;
      
      // Validate meeting ownership
      const userId = req.user.claims.sub;
      const hasAccess = await this.meetingService.validateMeetingOwnership(meetingId, userId);
      if (!hasAccess) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const meeting = await this.meetingService.getMeetingById(meetingId);
      if (!meeting) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      const notes = meeting.notes;
      const latestNote = notes[0];
      
      if (!latestNote) {
        res.status(400).json({ message: "No notes found for this meeting" });
        return;
      }

      // Prepare comprehensive meeting data for Salesforce sync
      const meetingData = {
        id: meeting.id,
        clientName: meeting.clientName,
        clientCompany: meeting.clientCompany,
        dealType: meeting.dealType,
        notes: latestNote.content,
        aiAnalysis: latestNote.aiAnalysis,
        coachingSuggestions: meeting.coachingSuggestions,
        createdAt: meeting.createdAt
      };

      const result = await salesforceService.syncMeetingToSalesforce(meetingData);
      
      await this.crmSyncService.createCrmSyncLog({
        meetingId,
        status: result.success ? 'success' : 'failed',
        syncData: result.success ? {
          opportunityId: result.opportunityId,
          contactId: result.contactId,
          accountId: result.accountId,
          taskId: result.taskId,
          noteId: result.noteId,
          meetingData
        } : null,
        error: result.error || null
      });

      res.json(result);
    } catch (error) {
      this.logger.error("Error syncing to CRM", {
        meetingId: req.body?.meetingId,
        userId: req.user?.claims?.sub,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.crmSyncService.createCrmSyncLog({
        meetingId: req.body.meetingId,
        status: 'failed',
        syncData: null,
        error: errorMessage
      });
      res.status(500).json({ message: "Failed to sync to CRM" });
    }
  }
}