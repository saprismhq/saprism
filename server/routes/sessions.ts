// Call session management routes

import type { Express } from "express";
import { db } from "../db";
import { IAuthenticationService } from "../core/AuthenticationService";
import { Container } from "../container/Container";
import { z } from "zod";
import { getLogger } from "../utils/LoggerFactory";

const createSessionSchema = z.object({
  meetingId: z.number(),
});

const updateSessionSchema = z.object({
  status: z.string().optional(),
  startedAt: z.string().datetime().optional(),
  endedAt: z.string().datetime().optional(),
  liveKitRoomName: z.string().optional(),
  liveKitToken: z.string().optional(),
  participants: z.any().optional(),
  transcription: z.any().optional(),
  sessionMetadata: z.any().optional(),
});

const updateContextSchema = z.object({
  participants: z.array(z.any()).optional(),
  events: z.array(z.any()).optional(),
  transcription: z.any().optional(),
  notes: z.any().optional(),
  isCallActive: z.boolean().optional(),
  connectionState: z.string().optional(),
});

export function registerSessionRoutes(app: Express) {
  const logger = getLogger('SessionRoutes');
  // Get auth service from container
  const container = Container.getInstance();
  const authService = container.get<IAuthenticationService>('AuthenticationService');
  const isAuthenticated = authService.getAuthenticatedMiddleware();

  // Create a new call session
  app.post('/api/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { meetingId } = createSessionSchema.parse(req.body);

      // Verify the meeting belongs to the user
      const meeting = await db.meeting.findFirst({
        where: { id: meetingId, userId }
      });

      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      // Create the call session
      const callSession = await db.callSession.create({
        data: {
          meetingId,
          liveKitRoomName: `meeting-${meetingId}-${Date.now()}`,
          status: 'waiting',
          participants: [],
          sessionMetadata: {
            createdBy: userId,
            meetingInfo: {
              clientName: meeting.clientName,
              clientCompany: meeting.clientCompany
            }
          }
        }
      });

      res.json(callSession);
    } catch (error) {
      logger.error('Error creating call session', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to create call session" });
    }
  });

  // Get call session by ID
  app.get('/api/sessions/:sessionId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;

      const callSession = await db.callSession.findFirst({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        include: {
          meeting: true
        }
      });

      if (!callSession) {
        return res.status(404).json({ message: "Call session not found" });
      }

      res.json(callSession);
    } catch (error) {
      logger.error('Error getting call session', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to get call session" });
    }
  });

  // Update call session
  app.patch('/api/sessions/:sessionId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;
      const updates = updateSessionSchema.parse(req.body);

      // Convert datetime strings to Date objects
      const processedUpdates: any = { ...updates };
      if (updates.startedAt) {
        processedUpdates.startedAt = new Date(updates.startedAt);
      }
      if (updates.endedAt) {
        processedUpdates.endedAt = new Date(updates.endedAt);
      }

      const callSession = await db.callSession.updateMany({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        data: processedUpdates
      });

      if (callSession.count === 0) {
        return res.status(404).json({ message: "Call session not found" });
      }

      // Return updated session
      const updatedSession = await db.callSession.findUnique({
        where: { id: sessionId },
        include: { meeting: true }
      });

      res.json(updatedSession);
    } catch (error) {
      logger.error('Error updating call session', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to update call session" });
    }
  });

  // End call session
  app.post('/api/sessions/:sessionId/end', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;

      const callSession = await db.callSession.updateMany({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        data: {
          status: 'ended',
          endedAt: new Date()
        }
      });

      if (callSession.count === 0) {
        return res.status(404).json({ message: "Call session not found" });
      }

      res.json({ message: "Call session ended successfully" });
    } catch (error) {
      logger.error('Error ending call session', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to end call session" });
    }
  });

  // Get session context (unified state)
  app.get('/api/sessions/:sessionId/context', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;

      const callSession = await db.callSession.findFirst({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        include: {
          meeting: {
            include: {
              notes: {
                orderBy: { createdAt: 'desc' },
                take: 1
              },
              coachingSuggestions: {
                orderBy: { createdAt: 'desc' },
                take: 5
              }
            }
          }
        }
      });

      if (!callSession) {
        return res.status(404).json({ message: "Call session not found" });
      }

      // Build session context
      const context = {
        callSession,
        meeting: callSession.meeting,
        participants: callSession.participants || [],
        events: [], // Could be stored separately if needed
        transcription: callSession.transcription || { segments: [] },
        notes: {
          manual: callSession.meeting.notes[0]?.content || '',
          aiGenerated: callSession.meeting.notes[0]?.aiAnalysis
        },
        isCallActive: callSession.status === 'active',
        connectionState: callSession.status === 'active' ? 'connected' : 'disconnected'
      };

      res.json(context);
    } catch (error) {
      logger.error('Error getting session context', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to get session context" });
    }
  });

  // Update session context
  app.patch('/api/sessions/:sessionId/context', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;
      const contextUpdates = updateContextSchema.parse(req.body);

      // Update call session with relevant context data
      const sessionUpdates: any = {};
      if (contextUpdates.participants) {
        sessionUpdates.participants = contextUpdates.participants;
      }
      if (contextUpdates.transcription) {
        sessionUpdates.transcription = contextUpdates.transcription;
      }

      const callSession = await db.callSession.updateMany({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        data: sessionUpdates
      });

      if (callSession.count === 0) {
        return res.status(404).json({ message: "Call session not found" });
      }

      res.json({ message: "Session context updated successfully" });
    } catch (error) {
      logger.error('Error updating session context', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to update session context" });
    }
  });

  // Save session notes
  app.post('/api/sessions/notes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId, content } = req.body;

      // Get the call session and associated meeting
      const callSession = await db.callSession.findFirst({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        include: { meeting: true }
      });

      if (!callSession) {
        return res.status(404).json({ message: "Call session not found" });
      }

      // Find or create note for the meeting
      const existingNote = await db.note.findFirst({
        where: { meetingId: callSession.meetingId }
      });

      if (existingNote) {
        await db.note.update({
          where: { id: existingNote.id },
          data: { content }
        });
      } else {
        await db.note.create({
          data: {
            meetingId: callSession.meetingId,
            content
          }
        });
      }

      res.json({ message: "Notes saved successfully" });
    } catch (error) {
      logger.error('Error saving session notes', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to save notes" });
    }
  });

  // Get session notes
  app.get('/api/sessions/:sessionId/notes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.params;

      const callSession = await db.callSession.findFirst({
        where: { 
          id: sessionId,
          meeting: { userId }
        },
        include: {
          meeting: {
            include: {
              notes: {
                orderBy: { createdAt: 'desc' },
                take: 1
              }
            }
          }
        }
      });

      if (!callSession) {
        return res.status(404).json({ message: "Call session not found" });
      }

      const content = callSession.meeting.notes[0]?.content || '';
      res.json({ content });
    } catch (error) {
      logger.error('Error getting session notes', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      res.status(500).json({ message: "Failed to get notes" });
    }
  });
}