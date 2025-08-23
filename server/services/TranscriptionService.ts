import OpenAI from 'openai';
import { createReadStream, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { WebSocket } from 'ws';
import { Container } from '../container/Container';
import { INoteService } from '../core/NoteService';
import { ICoachingService } from '../core/CoachingService';
import { openaiService } from './openai';
import { insertCoachingSuggestionSchema } from '@shared/schema';

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
      console.log(`Session ${sessionId} not found or inactive for audio chunk`);
      return;
    }

    console.log(`Adding audio chunk to session ${sessionId}, size: ${audioData.length}`);
    session.audioBuffer.push(audioData);
    
    // Process audio chunks when we have enough data (every 4 seconds worth for better context)
    const now = Date.now();
    if (now - session.lastProcessed > 4000 && session.audioBuffer.length > 0) {
      console.log(`Processing accumulated audio for session ${sessionId}, buffer count: ${session.audioBuffer.length}`);
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

      // Save to temporary file for OpenAI Whisper with proper WebM format
      const tempFilePath = join(tmpdir(), `audio_${sessionId}_${Date.now()}.webm`);
      
      // Write the WebM audio data directly (no conversion needed)
      writeFileSync(tempFilePath, combinedBuffer);

      // Process with OpenAI Whisper with improved settings for better quality
      const transcription = await this.openai.audio.transcriptions.create({
        file: createReadStream(tempFilePath),
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
        temperature: 0.2, // Lower temperature for more consistent results
        prompt: 'This is a business sales meeting conversation. Please transcribe clearly and accurately.' // Context hint for better accuracy
      });

      // Clean up temp file
      unlinkSync(tempFilePath);

      if (transcription && transcription.trim()) {
        // Add timestamp and speaker identification
        const timestamp = new Date().toLocaleTimeString();
        const formattedText = `[${timestamp}] ${transcription.trim()}\n`;
        
        session.accumulatedText += formattedText;

        // Broadcast real-time transcription to connected clients
        console.log(`Broadcasting transcription chunk for session ${sessionId}: "${formattedText}"`);
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
      // Only log significant errors, silence minor audio processing issues
      if (error instanceof Error && !error.message.includes('ENODATA')) {
        console.error(`Transcription error for session ${sessionId}:`, error.message);
        this.broadcastToSession(sessionId, {
          type: 'transcription_error', 
          sessionId,
          error: 'Audio processing error - continuing...'
        });
      }
      // Skip broadcasting minor audio processing failures to reduce noise
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
    
    // Save and analyze the finalized transcription directly
    try {
      const container = Container.getInstance();
      const noteService = container.get<INoteService>('NoteService');
      const coachingService = container.get<ICoachingService>('CoachingService');

      // Get existing notes for this meeting
      const existingNotes = await noteService.getNotesByMeetingId(session.meetingId);
      
      // Prepare transcription content with timestamp
      const transcriptionSection = `\n\n--- Call Transcription (${new Date().toLocaleString()}) ---\n${finalText}`;
      
      let noteId: number;
      let updatedContent: string;

      if (existingNotes.length > 0) {
        // Update existing note by appending transcription
        const existingNote = existingNotes[0];
        updatedContent = existingNote.content + transcriptionSection;
        
        await noteService.updateNote(existingNote.id, {
          content: updatedContent
        });
        noteId = existingNote.id;
      } else {
        // Create new note with transcription
        updatedContent = `Meeting Notes\n${transcriptionSection}`;
        
        const newNote = await noteService.createNote({
          meetingId: session.meetingId,
          content: updatedContent,
          aiAnalysis: null
        });
        noteId = newNote.id;
      }

      // Run AI analysis on the updated content
      console.log("Running AI analysis on finalized transcription...");
      const startTime = Date.now();
      
      const [analysis, coachingSuggestions] = await Promise.all([
        openaiService.analyzeNotes(updatedContent),
        openaiService.generateCoachingSuggestions(updatedContent, 'discovery')
      ]);
      
      console.log(`AI analysis completed in ${Date.now() - startTime}ms`);

      // Update note with AI analysis and store coaching suggestions
      await Promise.all([
        noteService.updateNote(noteId, { aiAnalysis: analysis }),
        coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId: session.meetingId,
          type: 'transcription_coaching',
          content: coachingSuggestions
        }))
      ]);

      console.log('Transcription finalized and analyzed successfully');
    } catch (error) {
      console.error('Error finalizing transcription:', error);
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
    Array.from(this.sessions.keys()).forEach(sessionId => {
      this.endTranscription(sessionId);
    });
  }
}

export const transcriptionService = new TranscriptionService();