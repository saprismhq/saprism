// Service interfaces and types for dependency injection

import type { CallSession, InsertCallSession, MeetingWithSessions } from '@shared/schema';

// Participant type for LiveKit
export interface Participant {
  sid: string;
  identity: string;
  name?: string;
  isLocal: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  joinedAt: Date;
}

// Call events
export interface CallEvent {
  type: 'participant_joined' | 'participant_left' | 'connection_state_changed' | 'transcription';
  timestamp: Date;
  data: any;
}

// Session context for unified state management
export interface SessionContext {
  callSession?: CallSession;
  meeting: MeetingWithSessions;
  participants: Participant[];
  events: CallEvent[];
  transcription: {
    segments: Array<{
      speaker: string;
      text: string;
      timestamp: Date;
      confidence?: number;
    }>;
  };
  notes: {
    manual: string;
    aiGenerated?: any;
  };
  isCallActive: boolean;
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
}

// Service interfaces
export interface ICallService {
  // Connection management
  connect(roomName: string, token: string): Promise<void>;
  disconnect(): Promise<void>;
  
  // Media controls
  toggleMute(): Promise<void>;
  toggleVideo(): Promise<void>;
  toggleScreenShare(): Promise<void>;
  
  // State getters
  getParticipants(): Participant[];
  getConnectionState(): string;
  isConnected(): boolean;
  
  // Event handling
  onParticipantJoined(callback: (participant: Participant) => void): void;
  onParticipantLeft(callback: (participant: Participant) => void): void;
  onConnectionStateChanged(callback: (state: string) => void): void;
  onTranscriptionReceived(callback: (text: string, speaker: string) => void): void;
}

export interface INotesService {
  // Notes management
  saveNote(sessionId: string, content: string): Promise<void>;
  getNotes(sessionId: string): Promise<string>;
  
  // Auto-save functionality
  enableAutoSave(sessionId: string, interval?: number): void;
  disableAutoSave(): void;
  
  // AI integration
  analyzeNotes(content: string, context: SessionContext): Promise<any>;
  
  // Cleanup
  cleanup?(): void;
}

export interface ISessionService {
  // Session lifecycle
  createSession(meetingId: number): Promise<CallSession>;
  getSession(sessionId: string): Promise<CallSession | null>;
  updateSession(sessionId: string, updates: Partial<CallSession>): Promise<CallSession>;
  endSession(sessionId: string): Promise<void>;
  
  // Context management
  getSessionContext(sessionId: string): Promise<SessionContext>;
  updateSessionContext(sessionId: string, context: Partial<SessionContext>): Promise<void>;
}

// Dependency injection container
export interface ServiceContainer {
  callService: ICallService;
  notesService: INotesService;
  sessionService: ISessionService;
}