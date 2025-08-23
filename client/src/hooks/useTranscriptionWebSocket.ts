import { useState, useEffect, useCallback, useRef } from 'react';

interface TranscriptionMessage {
  type: string;
  sessionId?: string;
  text?: string;
  timestamp?: number;
  accumulatedText?: string;
  finalText?: string;
  meetingId?: number;
  error?: string;
}

interface UseTranscriptionWebSocketProps {
  onTranscriptionChunk?: (text: string, accumulatedText: string) => void;
  onTranscriptionComplete?: (finalText: string, meetingId: number) => void;
  onError?: (error: string) => void;
}

export function useTranscriptionWebSocket({
  onTranscriptionChunk,
  onTranscriptionComplete,
  onError
}: UseTranscriptionWebSocketProps = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [accumulatedText, setAccumulatedText] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/transcription`;
    
    try {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('Transcription WebSocket connected');
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: TranscriptionMessage = JSON.parse(event.data);
          
          switch (message.type) {
            case 'connected':
              console.log('Transcription service connected');
              break;
              
            case 'transcription_started':
              setIsTranscribing(true);
              console.log(`Transcription started for session ${message.sessionId}`);
              break;
              
            case 'transcription_chunk':
              if (message.text && message.accumulatedText) {
                setAccumulatedText(message.accumulatedText);
                onTranscriptionChunk?.(message.text, message.accumulatedText);
              }
              break;
              
            case 'transcription_completed':
            case 'transcription_final':
              setIsTranscribing(false);
              if (message.finalText && message.meetingId) {
                onTranscriptionComplete?.(message.finalText, message.meetingId);
              }
              setAccumulatedText('');
              sessionIdRef.current = null;
              break;
              
            case 'transcription_error':
            case 'error':
              console.error('Transcription error:', message.error);
              onError?.(message.error || 'Transcription error occurred');
              break;
              
            default:
              console.log('Unknown transcription message:', message);
          }
        } catch (error) {
          console.error('Failed to parse transcription message:', error);
        }
      };

      wsRef.current.onclose = () => {
        console.log('Transcription WebSocket disconnected');
        setIsConnected(false);
        setIsTranscribing(false);
      };

      wsRef.current.onerror = (error) => {
        console.error('Transcription WebSocket error:', error);
        onError?.('WebSocket connection error');
      };

    } catch (error) {
      console.error('Failed to create transcription WebSocket:', error);
      onError?.('Failed to connect to transcription service');
    }
  }, [onTranscriptionChunk, onTranscriptionComplete, onError]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsTranscribing(false);
    setAccumulatedText('');
    sessionIdRef.current = null;
  }, []);

  const startTranscription = useCallback((sessionId: string, meetingId: number, userId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return false;
    }

    sessionIdRef.current = sessionId;
    setAccumulatedText('');

    wsRef.current.send(JSON.stringify({
      type: 'start_transcription',
      sessionId,
      meetingId,
      userId
    }));

    return true;
  }, []);

  const endTranscription = useCallback(() => {
    if (!wsRef.current || !sessionIdRef.current) return;

    wsRef.current.send(JSON.stringify({
      type: 'end_transcription',
      sessionId: sessionIdRef.current
    }));
  }, []);

  const sendAudioChunk = useCallback((audioData: string) => {
    if (!wsRef.current || !sessionIdRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return false;
    }

    wsRef.current.send(JSON.stringify({
      type: 'audio_chunk',
      sessionId: sessionIdRef.current,
      audioData
    }));

    return true;
  }, []);

  const subscribeToSession = useCallback((sessionId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'subscribe',
      sessionId
    }));
  }, []);

  // Auto-connect when hook is used
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    isConnected,
    isTranscribing,
    accumulatedText,
    connect,
    disconnect,
    startTranscription,
    endTranscription,
    sendAudioChunk,
    subscribeToSession
  };
}