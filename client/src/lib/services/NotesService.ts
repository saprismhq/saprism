// Enhanced notes service with auto-save and AI integration

import { apiRequest } from '../queryClient';
import type { INotesService, SessionContext } from './types';

export class NotesService implements INotesService {
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private currentSessionId: string | null = null;
  private lastSavedContent: string = '';

  async saveNote(sessionId: string, content: string): Promise<void> {
    try {
      await apiRequest('POST', '/api/sessions/notes', {
        sessionId,
        content
      });
      this.lastSavedContent = content;
      console.log('Note saved successfully for session:', sessionId);
    } catch (error) {
      console.error('Failed to save note:', error);
      throw error;
    }
  }

  async getNotes(sessionId: string): Promise<string> {
    try {
      const response = await apiRequest('GET', `/api/sessions/${sessionId}/notes`);
      const data = await response.json();
      return data.content || '';
    } catch (error) {
      console.error('Failed to get notes:', error);
      return '';
    }
  }

  enableAutoSave(sessionId: string, interval: number = 2000): void {
    this.disableAutoSave(); // Clear any existing auto-save
    this.currentSessionId = sessionId;
    
    this.autoSaveTimer = setInterval(async () => {
      // This will be triggered by content changes from the UI
      // The actual content will be passed via updateContent method
    }, interval);
    
    console.log(`Auto-save enabled for session ${sessionId} with ${interval}ms interval`);
  }

  disableAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
      this.currentSessionId = null;
      console.log('Auto-save disabled');
    }
  }

  // Method for UI to trigger auto-save with content
  async autoSaveContent(content: string): Promise<void> {
    if (!this.currentSessionId) return;
    
    // Only save if content has changed
    if (content !== this.lastSavedContent && content.trim().length > 0) {
      try {
        await this.saveNote(this.currentSessionId, content);
      } catch (error) {
        console.warn('Auto-save failed:', error);
        // Don't throw error for auto-save failures
      }
    }
  }

  async analyzeNotes(content: string, context: SessionContext): Promise<any> {
    if (!content.trim()) {
      return null;
    }

    try {
      const response = await apiRequest('POST', '/api/ai/analyze-session', {
        content,
        context: {
          meetingId: context.meeting.id,
          callSessionId: context.callSession?.id,
          participants: context.participants.map(p => ({
            identity: p.identity,
            name: p.name,
            joinedAt: p.joinedAt
          })),
          transcription: context.transcription,
          events: context.events
        }
      });

      const analysis = await response.json();
      console.log('Notes analysis completed:', analysis);
      return analysis;
    } catch (error) {
      console.error('Failed to analyze notes:', error);
      throw error;
    }
  }

  // Method to get content changes for auto-save integration
  shouldAutoSave(newContent: string): boolean {
    return newContent !== this.lastSavedContent && 
           newContent.trim().length > 0 &&
           this.currentSessionId !== null;
  }

  getLastSavedContent(): string {
    return this.lastSavedContent;
  }

  // Clean up when session ends
  cleanup(): void {
    this.disableAutoSave();
    this.lastSavedContent = '';
  }
}