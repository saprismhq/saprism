import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { transcriptionService } from '../services/TranscriptionService';

export function setupWebSocketServer(httpServer: Server): void {
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws/transcription'
  });

  console.log('WebSocket server setup for transcription on /ws/transcription');

  wss.on('connection', (ws: WebSocket, request) => {
    console.log('New WebSocket connection for transcription');
    
    let sessionId: string | null = null;
    let meetingId: number | null = null;

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case 'start_transcription':
            sessionId = message.sessionId;
            meetingId = message.meetingId;
            const userId = message.userId;
            
            if (sessionId && meetingId && userId) {
              await transcriptionService.startTranscription(sessionId, meetingId, userId, ws);
              console.log(`Started transcription for session ${sessionId}`);
            }
            break;

          case 'audio_chunk':
            if (sessionId && message.audioData) {
              // Convert base64 audio data to buffer
              const audioBuffer = Buffer.from(message.audioData, 'base64');
              await transcriptionService.addAudioChunk(sessionId, audioBuffer);
            }
            break;

          case 'end_transcription':
            if (sessionId) {
              const finalText = await transcriptionService.endTranscription(sessionId);
              ws.send(JSON.stringify({
                type: 'transcription_final',
                sessionId,
                finalText,
                meetingId
              }));
              console.log(`Ended transcription for session ${sessionId}`);
            }
            break;

          case 'subscribe':
            if (message.sessionId) {
              transcriptionService.addWebSocketConnection(message.sessionId, ws);
              console.log(`Client subscribed to session ${message.sessionId}`);
            }
            break;

          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Failed to process message'
        }));
      }
    });

    ws.on('close', () => {
      if (sessionId) {
        transcriptionService.removeWebSocketConnection(sessionId, ws);
        console.log(`WebSocket connection closed for session ${sessionId}`);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      if (sessionId) {
        transcriptionService.removeWebSocketConnection(sessionId, ws);
      }
    });

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'WebSocket transcription service connected'
    }));
  });
}