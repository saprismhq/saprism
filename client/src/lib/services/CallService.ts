// LiveKit-based call service implementation

import { Room, RoomEvent, RemoteParticipant, LocalParticipant, ConnectionState } from 'livekit-client';
import type { ICallService, Participant, CallEvent } from './types';

export class CallService implements ICallService {
  private room: Room | null = null;
  private participants: Participant[] = [];
  private eventCallbacks: Map<string, Function[]> = new Map();

  constructor() {
    this.initializeEventCallbacks();
  }

  private initializeEventCallbacks() {
    this.eventCallbacks.set('participantJoined', []);
    this.eventCallbacks.set('participantLeft', []);
    this.eventCallbacks.set('connectionStateChanged', []);
    this.eventCallbacks.set('transcriptionReceived', []);
  }

  async connect(roomName: string, token: string): Promise<void> {
    try {
      this.room = new Room();
      
      // Set up event listeners
      this.setupRoomEventListeners();
      
      // Connect to room
      const url = import.meta.env.VITE_LIVEKIT_URL || 'wss://your-livekit-server.com';
      await this.room.connect(url, token);
      
      console.log('Connected to LiveKit room:', roomName);
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.room) {
      await this.room.disconnect();
      this.room = null;
      this.participants = [];
      console.log('Disconnected from LiveKit room');
    }
  }

  async toggleMute(): Promise<void> {
    if (this.room?.localParticipant) {
      const enabled = this.room.localParticipant.isMicrophoneEnabled;
      await this.room.localParticipant.setMicrophoneEnabled(!enabled);
    }
  }

  async toggleVideo(): Promise<void> {
    if (this.room?.localParticipant) {
      const enabled = this.room.localParticipant.isCameraEnabled;
      await this.room.localParticipant.setCameraEnabled(!enabled);
    }
  }

  async toggleScreenShare(): Promise<void> {
    if (this.room?.localParticipant) {
      const isSharing = this.room.localParticipant.isScreenShareEnabled;
      await this.room.localParticipant.setScreenShareEnabled(!isSharing);
    }
  }

  getParticipants(): Participant[] {
    return [...this.participants];
  }

  getConnectionState(): string {
    return this.room?.state || 'disconnected';
  }

  isConnected(): boolean {
    return this.room?.state === ConnectionState.Connected;
  }

  // Event subscription methods
  onParticipantJoined(callback: (participant: Participant) => void): void {
    this.eventCallbacks.get('participantJoined')?.push(callback);
  }

  onParticipantLeft(callback: (participant: Participant) => void): void {
    this.eventCallbacks.get('participantLeft')?.push(callback);
  }

  onConnectionStateChanged(callback: (state: string) => void): void {
    this.eventCallbacks.get('connectionStateChanged')?.push(callback);
  }

  onTranscriptionReceived(callback: (text: string, speaker: string) => void): void {
    this.eventCallbacks.get('transcriptionReceived')?.push(callback);
  }

  private setupRoomEventListeners(): void {
    if (!this.room) return;

    this.room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      const participantData = this.mapToParticipant(participant, false);
      this.participants.push(participantData);
      this.emitEvent('participantJoined', participantData);
    });

    this.room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      const participantData = this.mapToParticipant(participant, false);
      this.participants = this.participants.filter(p => p.sid !== participant.sid);
      this.emitEvent('participantLeft', participantData);
    });

    this.room.on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
      this.emitEvent('connectionStateChanged', state);
    });

    this.room.on(RoomEvent.LocalTrackPublished, () => {
      // Update local participant state
      if (this.room?.localParticipant) {
        this.updateLocalParticipant();
      }
    });

    // Add transcription support (placeholder for future implementation)
    this.room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(payload));
        if (data.type === 'transcription') {
          this.emitEvent('transcriptionReceived', data.text, participant?.identity || 'unknown');
        }
      } catch (error) {
        console.warn('Failed to parse data message:', error);
      }
    });
  }

  private mapToParticipant(participant: LocalParticipant | RemoteParticipant, isLocal: boolean): Participant {
    return {
      sid: participant.sid,
      identity: participant.identity,
      name: participant.name,
      isLocal,
      isSpeaking: participant.isSpeaking,
      isMuted: !participant.isMicrophoneEnabled,
      isVideoEnabled: participant.isCameraEnabled,
      isScreenSharing: participant.isScreenShareEnabled,
      joinedAt: new Date(participant.joinedAt || Date.now())
    };
  }

  private updateLocalParticipant(): void {
    if (!this.room?.localParticipant) return;
    
    const localParticipant = this.mapToParticipant(this.room.localParticipant, true);
    const existingIndex = this.participants.findIndex(p => p.isLocal);
    
    if (existingIndex >= 0) {
      this.participants[existingIndex] = localParticipant;
    } else {
      this.participants.unshift(localParticipant);
    }
  }

  private emitEvent(eventType: string, ...args: any[]): void {
    const callbacks = this.eventCallbacks.get(eventType) || [];
    callbacks.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in ${eventType} callback:`, error);
      }
    });
  }
}