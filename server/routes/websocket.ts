import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { transcriptionService } from '../services/TranscriptionService';
import { getLogger } from '../utils/LoggerFactory';

export function setupWebSocketServer(httpServer: Server): void {
  const logger = getLogger('WebSocketServer');
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws/transcription'
  });

  logger.info('WebSocket server setup', { path: '/ws/transcription' });

  wss.on('connection', (ws: WebSocket, request) => {
    logger.info('New WebSocket connection for transcription');
    
    let sessionId: string | null = null;
    let meetingId: number | null = null;

    ws.on('message', async (data: Buffer) => {
      try {
        // Handle binary audio data directly
        if (data.length > 100 && !data.toString().startsWith('{')) {
          logger.debug('Received binary audio data', { size: data.length });
          if (sessionId) {
            await transcriptionService.addAudioChunk(sessionId, data);
          } else {
            logger.warn('No active session for binary audio data');
          }
          return;
        }

        // Handle JSON control messages
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case 'start_transcription':
            sessionId = message.sessionId;
            meetingId = message.meetingId;
            const userId = message.userId;
            
            if (sessionId && meetingId && userId) {
              await transcriptionService.startTranscription(sessionId, meetingId, userId, ws);
              logger.info('Started transcription for session', { sessionId });
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
              logger.info('Ended transcription for session', { sessionId });
            }
            break;

          case 'subscribe':
            if (message.sessionId) {
              transcriptionService.addWebSocketConnection(message.sessionId, ws);
              logger.debug('Client subscribed to session', { sessionId: message.sessionId });
            }
            break;

          default:
            logger.warn('Unknown message type', { messageType: message.type });
        }
      } catch (error) {
        logger.error('WebSocket message error', { 
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Failed to process message'
        }));
      }
    });

    ws.on('close', () => {
      if (sessionId) {
        transcriptionService.removeWebSocketConnection(sessionId, ws);
        logger.info('WebSocket connection closed for session', { sessionId });
      }
    });

    ws.on('error', (error) => {
      logger.error('WebSocket error', { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
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