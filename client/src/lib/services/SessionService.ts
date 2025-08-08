// Session management service for call sessions

import { apiRequest } from '../queryClient';
import type { ISessionService, SessionContext } from './types';
import type { CallSession, InsertCallSession, MeetingWithSessions } from '@shared/schema';

export class SessionService implements ISessionService {
  private sessionContextCache: Map<string, SessionContext> = new Map();

  async createSession(meetingId: number): Promise<CallSession> {
    try {
      const response = await apiRequest('POST', '/api/sessions', {
        meetingId
      });
      const session = await response.json();
      console.log('Call session created:', session);
      return session;
    } catch (error) {
      console.error('Failed to create call session:', error);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<CallSession | null> {
    try {
      const response = await apiRequest('GET', `/api/sessions/${sessionId}`);
      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Failed to get call session:', error);
      return null;
    }
  }

  async updateSession(sessionId: string, updates: Partial<CallSession>): Promise<CallSession> {
    try {
      const response = await apiRequest('PATCH', `/api/sessions/${sessionId}`, updates);
      const session = await response.json();
      
      // Update cached context if it exists
      const cachedContext = this.sessionContextCache.get(sessionId);
      if (cachedContext) {
        cachedContext.callSession = session;
        this.sessionContextCache.set(sessionId, cachedContext);
      }
      
      return session;
    } catch (error) {
      console.error('Failed to update call session:', error);
      throw error;
    }
  }

  async endSession(sessionId: string): Promise<void> {
    try {
      await apiRequest('POST', `/api/sessions/${sessionId}/end`);
      
      // Clean up cached context
      this.sessionContextCache.delete(sessionId);
      
      console.log('Call session ended:', sessionId);
    } catch (error) {
      console.error('Failed to end call session:', error);
      throw error;
    }
  }

  async getSessionContext(sessionId: string): Promise<SessionContext> {
    // Check cache first
    const cached = this.sessionContextCache.get(sessionId);
    if (cached) {
      return cached;
    }

    try {
      const response = await apiRequest('GET', `/api/sessions/${sessionId}/context`);
      const contextData = await response.json();
      
      const context: SessionContext = {
        callSession: contextData.callSession,
        meeting: contextData.meeting,
        participants: contextData.participants || [],
        events: contextData.events || [],
        transcription: contextData.transcription || { segments: [] },
        notes: contextData.notes || { manual: '' },
        isCallActive: contextData.isCallActive || false,
        connectionState: contextData.connectionState || 'disconnected'
      };

      // Cache the context
      this.sessionContextCache.set(sessionId, context);
      
      return context;
    } catch (error) {
      console.error('Failed to get session context:', error);
      throw error;
    }
  }

  async updateSessionContext(sessionId: string, contextUpdates: Partial<SessionContext>): Promise<void> {
    try {
      await apiRequest('PATCH', `/api/sessions/${sessionId}/context`, contextUpdates);
      
      // Update cached context
      const cached = this.sessionContextCache.get(sessionId);
      if (cached) {
        Object.assign(cached, contextUpdates);
        this.sessionContextCache.set(sessionId, cached);
      }
      
      console.log('Session context updated:', sessionId);
    } catch (error) {
      console.error('Failed to update session context:', error);
      throw error;
    }
  }

  // Utility methods for context management
  updateParticipants(sessionId: string, participants: any[]): void {
    const context = this.sessionContextCache.get(sessionId);
    if (context) {
      context.participants = participants;
      this.sessionContextCache.set(sessionId, context);
    }
  }

  addEvent(sessionId: string, event: any): void {
    const context = this.sessionContextCache.get(sessionId);
    if (context) {
      context.events.push(event);
      this.sessionContextCache.set(sessionId, context);
    }
  }

  updateConnectionState(sessionId: string, state: string): void {
    const context = this.sessionContextCache.get(sessionId);
    if (context) {
      context.connectionState = state as any;
      context.isCallActive = state === 'connected';
      this.sessionContextCache.set(sessionId, context);
    }
  }

  clearCache(): void {
    this.sessionContextCache.clear();
  }

  // Serialization for AI context
  serializeContextForAI(sessionId: string): any {
    const context = this.sessionContextCache.get(sessionId);
    if (!context) return null;

    return {
      meeting: {
        id: context.meeting.id,
        clientName: context.meeting.clientName,
        clientCompany: context.meeting.clientCompany,
        createdAt: context.meeting.createdAt
      },
      callSession: context.callSession ? {
        id: context.callSession.id,
        status: context.callSession.status,
        startedAt: context.callSession.startedAt,
        participants: context.callSession.participants
      } : null,
      participants: context.participants.map(p => ({
        identity: p.identity,
        name: p.name,
        joinedAt: p.joinedAt,
        participationDuration: Date.now() - p.joinedAt.getTime()
      })),
      events: context.events,
      transcription: context.transcription,
      notes: context.notes,
      callMetrics: {
        duration: context.callSession?.startedAt ? 
          Date.now() - new Date(context.callSession.startedAt).getTime() : 0,
        participantCount: context.participants.length,
        isActive: context.isCallActive
      }
    };
  }
}