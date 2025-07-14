import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { openaiService } from "./services/openai";
import { salesforceService } from "./services/salesforce";
import { insertMeetingSchema, insertNoteSchema, insertCoachingSuggestionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Meeting routes
  app.post('/api/meetings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const meetingData = insertMeetingSchema.parse({ ...req.body, userId });
      
      const meeting = await storage.createMeeting(meetingData);
      res.json(meeting);
    } catch (error) {
      console.error("Error creating meeting:", error);
      res.status(500).json({ message: "Failed to create meeting" });
    }
  });

  app.get('/api/meetings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const meetings = await storage.getMeetingsByUser(userId);
      res.json(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  app.get('/api/meetings/:id', isAuthenticated, async (req: any, res) => {
    try {
      const meetingId = parseInt(req.params.id);
      const meeting = await storage.getMeeting(meetingId);
      
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      // Check if user owns this meeting
      const userId = req.user.claims.sub;
      if (meeting.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(meeting);
    } catch (error) {
      console.error("Error fetching meeting:", error);
      res.status(500).json({ message: "Failed to fetch meeting" });
    }
  });

  // Notes routes
  app.post('/api/notes', isAuthenticated, async (req: any, res) => {
    try {
      const noteData = insertNoteSchema.parse(req.body);
      
      // Verify user owns the meeting
      const meeting = await storage.getMeeting(noteData.meetingId);
      if (!meeting || meeting.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      const note = await storage.createNote(noteData);
      res.json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ message: "Failed to create note" });
    }
  });

  app.put('/api/notes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const noteId = parseInt(req.params.id);
      const updates = req.body;
      
      const note = await storage.updateNote(noteId, updates);
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Failed to update note" });
    }
  });

  // AI Analysis routes
  app.post('/api/ai/analyze', isAuthenticated, async (req: any, res) => {
    try {
      const { content, meetingId } = req.body;
      
      if (!content || !meetingId) {
        return res.status(400).json({ message: "Content and meetingId are required" });
      }

      // Verify user owns the meeting
      const meeting = await storage.getMeeting(meetingId);
      if (!meeting || meeting.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      const analysis = await openaiService.analyzeNotes(content);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing notes:", error);
      res.status(500).json({ message: "Failed to analyze notes" });
    }
  });

  app.post('/api/ai/coaching', isAuthenticated, async (req: any, res) => {
    try {
      const { content, dealStage, meetingId } = req.body;
      
      if (!content || !dealStage || !meetingId) {
        return res.status(400).json({ message: "Content, dealStage, and meetingId are required" });
      }

      // Verify user owns the meeting
      const meeting = await storage.getMeeting(meetingId);
      if (!meeting || meeting.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      const suggestions = await openaiService.generateCoachingSuggestions(content, dealStage);
      
      // Store coaching suggestions
      await storage.createCoachingSuggestion({
        meetingId,
        type: 'all',
        content: suggestions
      });

      res.json(suggestions);
    } catch (error) {
      console.error("Error generating coaching suggestions:", error);
      res.status(500).json({ message: "Failed to generate coaching suggestions" });
    }
  });

  // CRM Sync routes
  app.post('/api/crm/sync', isAuthenticated, async (req: any, res) => {
    try {
      const { meetingId } = req.body;
      
      if (!meetingId) {
        return res.status(400).json({ message: "Meeting ID is required" });
      }

      // Verify user owns the meeting
      const meeting = await storage.getMeeting(meetingId);
      if (!meeting || meeting.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Get the latest note for this meeting
      const latestNote = meeting.notes[0];
      if (!latestNote) {
        return res.status(400).json({ message: "No notes found for this meeting" });
      }

      // Prepare sync data
      const analysis = latestNote.aiAnalysis as any;
      const syncData = {
        accountName: meeting.clientCompany || meeting.clientName,
        contactName: meeting.clientName,
        subject: `Meeting with ${meeting.clientName}`,
        description: latestNote.content,
        painPoints: analysis?.painPoints || [],
        budget: analysis?.budget || "",
        timeline: analysis?.timeline || "",
        nextSteps: meeting.coachingSuggestions
          .filter(s => s.type === 'next_steps')
          .flatMap(s => {
            const content = s.content as any;
            return content?.nextSteps?.map((step: any) => step.step) || [];
          })
      };

      // Sync to Salesforce
      const result = await salesforceService.syncMeetingNotes(syncData);
      
      // Log the sync attempt
      await storage.createCrmSyncLog({
        meetingId,
        status: result.success ? 'success' : 'failed',
        syncData,
        errorMessage: result.error
      });

      res.json(result);
    } catch (error) {
      console.error("Error syncing to CRM:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      await storage.createCrmSyncLog({
        meetingId: req.body.meetingId,
        status: 'failed',
        syncData: null,
        errorMessage
      });
      res.status(500).json({ message: "Failed to sync to CRM" });
    }
  });

  app.get('/api/crm/status', isAuthenticated, async (req: any, res) => {
    try {
      const status = await salesforceService.testConnection();
      res.json(status);
    } catch (error) {
      console.error("Error checking CRM status:", error);
      res.status(500).json({ message: "Failed to check CRM status" });
    }
  });

  // Coaching suggestions routes
  app.get('/api/coaching/:meetingId', isAuthenticated, async (req: any, res) => {
    try {
      const meetingId = parseInt(req.params.meetingId);
      
      // Verify user owns the meeting
      const meeting = await storage.getMeeting(meetingId);
      if (!meeting || meeting.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }

      const suggestions = await storage.getCoachingSuggestionsByMeeting(meetingId);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching coaching suggestions:", error);
      res.status(500).json({ message: "Failed to fetch coaching suggestions" });
    }
  });

  app.put('/api/coaching/:id/used', isAuthenticated, async (req: any, res) => {
    try {
      const suggestionId = parseInt(req.params.id);
      const suggestion = await storage.updateCoachingSuggestion(suggestionId, { isUsed: true });
      res.json(suggestion);
    } catch (error) {
      console.error("Error marking suggestion as used:", error);
      res.status(500).json({ message: "Failed to update suggestion" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
