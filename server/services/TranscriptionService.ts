import OpenAI from 'openai';
import { createWriteStream, createReadStream, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { WebSocket } from 'ws';

interface TranscriptionSession {
  meetingId: number;
  userId: string;
  audioBuffer: Buffer[];
  lastProcessed: number;
  wsConnections: Set<WebSocket>;
  isActive: boolean;
  accumulatedText: string;
}

export class TranscriptionService {
  private openai: OpenAI;
  private sessions: Map<string, TranscriptionSession> = new Map();
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    // Start processing interval for real-time transcription
    this.startProcessingLoop();
  }

  async startTranscription(sessionId: string, meetingId: number, userId: string, wsConnection: WebSocket): Promise<void> {
    const session: TranscriptionSession = {
      meetingId,
      userId,
      audioBuffer: [],
      lastProcessed: Date.now(),
      wsConnections: new Set([wsConnection]),
      isActive: true,
      accumulatedText: ''
    };

    this.sessions.set(sessionId, session);
    
    console.log(`Started transcription session ${sessionId} for meeting ${meetingId}`);
    
    // Send initial status to client
    this.broadcastToSession(sessionId, {
      type: 'transcription_started',
      sessionId,
      meetingId
    });
  }

  async addAudioChunk(sessionId: string, audioData: Buffer): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.isActive) {
      return;
    }

    session.audioBuffer.push(audioData);
    
    // Process audio chunks when we have enough data (every 3 seconds worth)
    const now = Date.now();
    if (now - session.lastProcessed > 3000 && session.audioBuffer.length > 0) {
      await this.processAudioBuffer(sessionId);
    }
  }

  private async processAudioBuffer(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || session.audioBuffer.length === 0) {
      return;
    }

    try {
      // Combine audio chunks
      const combinedBuffer = Buffer.concat(session.audioBuffer);
      session.audioBuffer = [];
      session.lastProcessed = Date.now();

      // Save to temporary file for OpenAI Whisper
      const tempFilePath = join(tmpdir(), `audio_${sessionId}_${Date.now()}.wav`);
      
      // Convert to WAV format (simplified - in production you'd use proper audio conversion)
      createWriteStream(tempFilePath).write(combinedBuffer);

      // Process with OpenAI Whisper
      const transcription = await this.openai.audio.transcriptions.create({
        file: createReadStream(tempFilePath),
        model: 'whisper-1',
        language: 'en',
        response_format: 'text'
      });

      // Clean up temp file
      unlinkSync(tempFilePath);

      if (transcription && transcription.trim()) {
        // Add timestamp and speaker identification
        const timestamp = new Date().toLocaleTimeString();
        const formattedText = `[${timestamp}] ${transcription.trim()}\n`;
        
        session.accumulatedText += formattedText;

        // Broadcast real-time transcription to connected clients
        this.broadcastToSession(sessionId, {
          type: 'transcription_chunk',
          sessionId,
          text: formattedText,
          timestamp: Date.now(),
          accumulatedText: session.accumulatedText
        });

        console.log(`Transcribed for session ${sessionId}: ${transcription.trim()}`);
      }

    } catch (error) {
      console.error(`Transcription error for session ${sessionId}:`, error);
      this.broadcastToSession(sessionId, {
        type: 'transcription_error',
        sessionId,
        error: 'Failed to process audio chunk'
      });
    }
  }

  async endTranscription(sessionId: string): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return '';
    }

    session.isActive = false;

    // Process any remaining audio
    if (session.audioBuffer.length > 0) {
      await this.processAudioBuffer(sessionId);
    }

    // Clean up and finalize transcription
    const finalText = await this.finalizeTranscription(session.accumulatedText);
    
    // Call API to save and analyze the finalized transcription
    try {
      const response = await fetch('http://localhost:5000/api/ai/transcription/finalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingId: session.meetingId,
          finalText
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Transcription finalized and analyzed:', result);
      } else {
        console.error('Failed to finalize transcription:', response.statusText);
      }
    } catch (error) {
      console.error('Error calling finalize transcription API:', error);
    }
    
    // Broadcast completion
    this.broadcastToSession(sessionId, {
      type: 'transcription_completed',
      sessionId,
      finalText,
      meetingId: session.meetingId
    });

    // Clean up session
    this.sessions.delete(sessionId);
    
    console.log(`Ended transcription session ${sessionId}`);
    return finalText;
  }

  private async finalizeTranscription(rawText: string): Promise<string> {
    if (!rawText.trim()) {
      return '';
    }

    try {
      // Use OpenAI to clean up and format the transcription
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a professional transcription editor. Clean up the following meeting transcription by:
            1. Removing filler words and false starts
            2. Adding proper punctuation and formatting
            3. Organizing into clear paragraphs
            4. Maintaining the speaker timestamps
            5. Making it readable while preserving all important content
            
            Keep the format: [timestamp] Speaker content`
          },
          {
            role: 'user',
            content: rawText
          }
        ],
        temperature: 0.1
      });

      return completion.choices[0]?.message?.content || rawText;
    } catch (error) {
      console.error('Error finalizing transcription:', error);
      return rawText;
    }
  }

  addWebSocketConnection(sessionId: string, ws: WebSocket): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.wsConnections.add(ws);
      
      // Send current state to new connection
      ws.send(JSON.stringify({
        type: 'transcription_state',
        sessionId,
        accumulatedText: session.accumulatedText,
        isActive: session.isActive
      }));
    }
  }

  removeWebSocketConnection(sessionId: string, ws: WebSocket): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.wsConnections.delete(ws);
    }
  }

  private broadcastToSession(sessionId: string, message: any): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const messageStr = JSON.stringify(message);
    session.wsConnections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }

  private startProcessingLoop(): void {
    // Process audio buffers every 2 seconds
    this.processingInterval = setInterval(async () => {
      for (const [sessionId, session] of Array.from(this.sessions.entries())) {
        if (session.isActive && session.audioBuffer.length > 0) {
          const timeSinceLastProcess = Date.now() - session.lastProcessed;
          if (timeSinceLastProcess > 2000) {
            await this.processAudioBuffer(sessionId);
          }
        }
      }
    }, 2000);
  }

  destroy(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    
    // End all active sessions
    for (const [sessionId] of Array.from(this.sessions.keys())) {
      this.endTranscription(sessionId);
    }
  }
}

export const transcriptionService = new TranscriptionService();