import { aiService } from './ai/AIService';
import { createReadStream, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { WebSocket } from 'ws';
import { Container } from '../container/Container';
import { INoteService } from '../core/NoteService';
import { ICoachingService } from '../core/CoachingService';
// OpenAI service now abstracted through aiService
import { insertCoachingSuggestionSchema } from '@shared/schema';
import { getLogger } from '../utils/LoggerFactory';
import winston from 'winston';

interface TranscriptionSession {
  meetingId: number;
  userId: string;
  audioBuffer: Buffer[];
  lastProcessed: number;
  wsConnections: Set<WebSocket>;
  isActive: boolean;
  accumulatedText: string;
  audioBackupPath?: string; // Path to backup audio file
  transcriptionFailures: number;
  lastTranscriptionError?: string;
  hasTranscriptionFailed: boolean;
}

export class TranscriptionService {
  private sessions: Map<string, TranscriptionSession> = new Map();
  private processingInterval: NodeJS.Timeout | null = null;
  private maxTranscriptionFailures = 3;
  private fallbackMessage = "📝 **Note:** Transcription temporarily unavailable - audio has been recorded and will be processed later.";
  private logger: winston.Logger;

  constructor() {
    this.logger = getLogger('TranscriptionService');
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
      accumulatedText: '',
      audioBackupPath: join(tmpdir(), `backup_audio_${sessionId}_${Date.now()}.webm`),
      transcriptionFailures: 0,
      hasTranscriptionFailed: false
    };

    this.sessions.set(sessionId, session);
    
    this.logger.info('Started transcription session', { sessionId, meetingId });
    
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
      this.logger.warn('Session not found or inactive for audio chunk', { sessionId });
      return;
    }

    this.logger.debug('Adding audio chunk', { sessionId, audioSize: audioData.length });
    session.audioBuffer.push(audioData);
    
    // Always backup audio data to file for resilience
    await this.backupAudioChunk(sessionId, audioData);
    
    // Process audio chunks when we have enough data (every 4 seconds worth for better context)
    const now = Date.now();
    if (now - session.lastProcessed > 4000 && session.audioBuffer.length > 0) {
      this.logger.debug('Processing accumulated audio', { sessionId, bufferCount: session.audioBuffer.length });
      await this.processAudioBuffer(sessionId);
    }
  }

  private async backupAudioChunk(sessionId: string, audioData: Buffer): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.audioBackupPath) return;

    try {
      // Append audio chunk to backup file
      const fs = await import('fs/promises');
      await fs.appendFile(session.audioBackupPath, audioData);
    } catch (error) {
      this.logger.error('Failed to backup audio chunk', { sessionId, error: error instanceof Error ? error.message : String(error) });
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

      // Process with AI service transcription (abstracted provider)
      const transcription = await aiService.transcribeAudio(combinedBuffer);

      // Clean up temp file
      unlinkSync(tempFilePath);

      if (transcription && transcription.trim()) {
        // Add timestamp and speaker identification
        const timestamp = new Date().toLocaleTimeString();
        const formattedText = `[${timestamp}] ${transcription.trim()}\n`;
        
        session.accumulatedText += formattedText;

        // Broadcast real-time transcription to connected clients
        this.logger.debug('Broadcasting transcription chunk', { sessionId, formattedText });
        this.broadcastToSession(sessionId, {
          type: 'transcription_chunk',
          sessionId,
          text: formattedText,
          timestamp: Date.now(),
          accumulatedText: session.accumulatedText
        });

        this.logger.debug('Transcribed for session', { sessionId, transcription: transcription.trim() });
      }

    } catch (error) {
      await this.handleTranscriptionError(sessionId, error);
    }
  }

  private async handleTranscriptionError(sessionId: string, error: any): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.transcriptionFailures++;
    session.lastTranscriptionError = error instanceof Error ? error.message : String(error);
    
    this.logger.error('Transcription error', { sessionId, attempts: session.transcriptionFailures, error: session.lastTranscriptionError });

    // Only log significant errors, silence minor audio processing issues
    if (error instanceof Error && error.message.includes('ENODATA')) {
      this.logger.debug('Minor audio processing error - skipping', { sessionId });
      return;
    }

    // If we've reached max failures, mark transcription as failed but continue recording
    if (session.transcriptionFailures >= this.maxTranscriptionFailures && !session.hasTranscriptionFailed) {
      session.hasTranscriptionFailed = true;
      
      this.logger.warn('Transcription service failed after max attempts, continuing audio recording', { sessionId, maxAttempts: this.maxTranscriptionFailures });
      
      // Add fallback message to accumulated text
      const timestamp = new Date().toLocaleTimeString();
      const fallbackMessage = `[${timestamp}] ${this.fallbackMessage}\n`;
      session.accumulatedText += fallbackMessage;

      // Broadcast fallback message to clients
      this.broadcastToSession(sessionId, {
        type: 'transcription_chunk',
        sessionId,
        text: fallbackMessage,
        timestamp: Date.now(),
        accumulatedText: session.accumulatedText
      });

      // Notify about transcription failure but audio backup
      this.broadcastToSession(sessionId, {
        type: 'transcription_fallback',
        sessionId,
        message: 'Transcription temporarily unavailable - audio recording continues',
        hasAudioBackup: true
      });
    } else if (session.transcriptionFailures < this.maxTranscriptionFailures) {
      // For early failures, just broadcast a soft error
      this.broadcastToSession(sessionId, {
        type: 'transcription_error', 
        sessionId,
        error: `Audio processing error (${session.transcriptionFailures}/${this.maxTranscriptionFailures}) - retrying...`
      });
    }
  }

  async endTranscription(sessionId: string): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return '';
    }

    session.isActive = false;

    // Process any remaining audio if transcription hasn't completely failed
    if (session.audioBuffer.length > 0 && !session.hasTranscriptionFailed) {
      await this.processAudioBuffer(sessionId);
    }

    // Clean up and finalize transcription
    let finalText = session.accumulatedText;
    
    // Only attempt to finalize through OpenAI if transcription was working
    if (!session.hasTranscriptionFailed && finalText.trim()) {
      finalText = await this.finalizeTranscription(finalText);
    } else if (session.hasTranscriptionFailed) {
      // Add summary message for failed transcription
      const backupNote = `\n\n--- Audio Recording Summary ---\n` +
        `Transcription service encountered issues during this session.\n` +
        `Audio has been recorded and saved for manual processing.\n` +
        `Last error: ${session.lastTranscriptionError || 'Unknown error'}`;
      finalText += backupNote;
    }
    
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
      this.logger.info('Running AI analysis on finalized transcription', { sessionId, meetingId: session.meetingId });
      const startTime = Date.now();
      
      const [analysis, coachingSuggestions] = await Promise.all([
        aiService.analyzeNotes(updatedContent),
        aiService.generateCoachingSuggestions(updatedContent, 'discovery')
      ]);
      
      this.logger.info('AI analysis completed', { sessionId, duration: Date.now() - startTime });

      // Update note with AI analysis and store coaching suggestions
      await Promise.all([
        noteService.updateNote(noteId, { aiAnalysis: analysis }),
        coachingService.createCoachingSuggestion(insertCoachingSuggestionSchema.parse({
          meetingId: session.meetingId,
          type: 'transcription_coaching',
          content: coachingSuggestions
        }))
      ]);

      this.logger.info('Transcription finalized and analyzed successfully', { sessionId, meetingId: session.meetingId });
    } catch (error) {
      this.logger.error('Error finalizing transcription', { sessionId, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
      
      // If finalization fails, at least save a fallback note
      try {
        const container = Container.getInstance();
        const noteService = container.get<INoteService>('NoteService');
        
        const fallbackContent = session.hasTranscriptionFailed 
          ? `Meeting Notes\n\n${this.fallbackMessage}\n\nAudio has been recorded and saved for processing.`
          : `Meeting Notes\n\nTranscription processing failed, but audio was recorded.\nAudio has been saved for manual processing.`;
          
        await noteService.createNote({
          meetingId: session.meetingId,
          content: fallbackContent,
          aiAnalysis: null
        });
        
        this.logger.warn('Fallback note created due to transcription processing failure', { sessionId, meetingId: session.meetingId });
      } catch (fallbackError) {
        this.logger.error('Failed to create fallback note', { sessionId, error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError) });
      }
    }
    
    // Broadcast completion
    this.broadcastToSession(sessionId, {
      type: 'transcription_completed',
      sessionId,
      finalText,
      meetingId: session.meetingId
    });

    // Clean up session (but keep backup file for potential manual processing)
    this.sessions.delete(sessionId);
    
    this.logger.info('Ended transcription session', { sessionId, hasTranscriptionFailed: session.hasTranscriptionFailed });
    return finalText;
  }

  private async finalizeTranscription(rawText: string): Promise<string> {
    if (!rawText.trim()) {
      return '';
    }

    try {
      // Use abstracted AI service to clean up and format the transcription
      const cleanedText = await aiService.generateChatResponse(
        `Clean up this meeting transcription by removing filler words, adding proper punctuation, and organizing into clear paragraphs while maintaining speaker timestamps and content:\n\n${rawText}`,
        'Professional transcription editing',
        []
      );

      return cleanedText || rawText;
    } catch (error) {
      this.logger.error('Error finalizing transcription with OpenAI, returning raw text', { error: error instanceof Error ? error.message : String(error) });
      return rawText;
    }
  }

  private async retryOpenAICall<T>(apiCall: () => Promise<T>, maxRetries: number = 2): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        lastError = error;
        this.logger.warn('OpenAI API call failed', { attempt: attempt + 1, maxRetries: maxRetries + 1, error: error instanceof Error ? error.message : String(error) });
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
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