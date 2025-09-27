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
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'reconnecting'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  const baseReconnectDelay = 1000; // 1 second
  const shouldReconnectRef = useRef(false);
  const pendingSessionRef = useRef<{ sessionId: string; meetingId: number; userId: string } | null>(null);
  
  // Expose wsRef for audio data sending
  (window as any).transcriptionWsRef = wsRef;

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const scheduleReconnect = useCallback(() => {
    if (!shouldReconnectRef.current || reconnectAttemptsRef.current >= maxReconnectAttempts) {
      if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        onError?.('Failed to reconnect to transcription service after multiple attempts');
        setConnectionStatus('disconnected');
      }
      return;
    }

    clearReconnectTimeout();
    
    // Exponential backoff with jitter
    const delay = Math.min(
      baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current) + Math.random() * 1000,
      30000 // Max 30 seconds
    );
    
    console.log(`Scheduling reconnection attempt ${reconnectAttemptsRef.current + 1} in ${delay}ms`);
    setConnectionStatus('reconnecting');
    
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current++;
      connect();
    }, delay);
  }, [clearReconnectTimeout, onError]);

  const connect = useCallback(() => {
    // Prevent multiple connections
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }


    setConnectionStatus('connecting');
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/transcription`;
    
    try {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('Transcription WebSocket connected successfully');
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
        clearReconnectTimeout();
        
        // Store the WebSocket reference globally for audio data sending
        (window as any).transcriptionWsRef = wsRef;

        // Resume pending session if any
        if (pendingSessionRef.current) {
          console.log('Resuming transcription session after reconnection');
          const { sessionId, meetingId, userId } = pendingSessionRef.current;
          // Call startTranscription but avoid circular dependency by using internal logic
          sessionIdRef.current = sessionId;
          setAccumulatedText('');
          
          try {
            wsRef.current?.send(JSON.stringify({
              type: 'start_transcription',
              sessionId,
              meetingId,
              userId
            }));
            
            // Clear pending session since we successfully sent the message
            pendingSessionRef.current = null;
          } catch (error) {
            console.error('Failed to resume transcription session:', error);
            // Keep pending session for retry
          }
        }
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
              // Only log significant transcription errors, ignore minor audio processing issues
              if (message.error && !message.error.includes('Audio processing error - continuing')) {
                console.warn('Transcription warning:', message.error);
                if (isTranscribing) {
                  onError?.(message.error);
                }
              }
              break;
              
            case 'transcription_fallback':
              console.warn('Transcription service temporarily unavailable - audio recording continues');
              // Notify user through error callback with a more user-friendly message
              onError?.('Transcription temporarily unavailable - call is still being recorded');
              break;
              
            default:
              console.log('Unknown transcription message:', message);
          }
        } catch (error) {
          console.error('Failed to parse transcription message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('Transcription WebSocket disconnected', { code: event.code, reason: event.reason });
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Don't reset transcribing state if we plan to reconnect
        if (!shouldReconnectRef.current) {
          setIsTranscribing(false);
        }
        
        // Auto-reconnect if we should be connected (unless it's a normal close)
        if (shouldReconnectRef.current && event.code !== 1000) {
          console.log('Connection lost, attempting to reconnect...');
          scheduleReconnect();
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('Transcription WebSocket error:', error);
        setConnectionStatus('disconnected');
        
        // Only show error if we're actively trying to transcribe and it's not during a reconnection
        if (isTranscribing && reconnectAttemptsRef.current === 0) {
          onError?.('WebSocket connection error - attempting to reconnect');
        }
        
        // Trigger reconnection on error if we should be connected
        if (shouldReconnectRef.current) {
          scheduleReconnect();
        }
      };

    } catch (error) {
      console.error('Failed to create transcription WebSocket:', error);
      setConnectionStatus('disconnected');
      
      // Schedule reconnection if we should be connected
      if (shouldReconnectRef.current) {
        scheduleReconnect();
      }
    }
  }, [onTranscriptionChunk, onTranscriptionComplete, onError, isTranscribing, scheduleReconnect, clearReconnectTimeout]);

  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;
    pendingSessionRef.current = null;
    clearReconnectTimeout();
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'Normal closure'); // Normal closure code
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsTranscribing(false);
    setAccumulatedText('');
    setConnectionStatus('disconnected');
    sessionIdRef.current = null;
    reconnectAttemptsRef.current = 0;
  }, [clearReconnectTimeout]);

  const startTranscription = useCallback((sessionId: string, meetingId: number, userId: string) => {
    shouldReconnectRef.current = true; // Enable auto-reconnection
    sessionIdRef.current = sessionId;
    setAccumulatedText('');
    
    // Store session info for potential reconnection
    pendingSessionRef.current = { sessionId, meetingId, userId };

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not connected, attempting to connect first');
      connect();
      return false;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'start_transcription',
        sessionId,
        meetingId,
        userId
      }));
      
      // Clear pending session since we successfully sent the message
      pendingSessionRef.current = null;
      return true;
    } catch (error) {
      console.error('Failed to send start transcription message:', error);
      // Keep pending session for retry
      return false;
    }
  }, [connect]);

  const endTranscription = useCallback(() => {
    shouldReconnectRef.current = false; // Disable auto-reconnection
    pendingSessionRef.current = null;
    clearReconnectTimeout();
    
    if (!wsRef.current || !sessionIdRef.current) return;

    try {
      wsRef.current.send(JSON.stringify({
        type: 'end_transcription',
        sessionId: sessionIdRef.current
      }));
    } catch (error) {
      console.error('Failed to send end transcription message:', error);
    }
  }, [clearReconnectTimeout]);

  const sendAudioChunk = useCallback((audioData: string) => {
    if (!wsRef.current || !sessionIdRef.current) {
      console.warn('Cannot send audio chunk: WebSocket or session not available');
      return false;
    }

    if (wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('Cannot send audio chunk: WebSocket not open');
      // Don't attempt reconnection here as it might be too frequent
      return false;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'audio_chunk',
        sessionId: sessionIdRef.current,
        audioData
      }));
      return true;
    } catch (error) {
      console.error('Failed to send audio chunk:', error);
      return false;
    }
  }, []);

  const subscribeToSession = useCallback((sessionId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'subscribe',
      sessionId
    }));
  }, []);

  // Only connect when explicitly needed, not automatically
  useEffect(() => {
    return () => {
      shouldReconnectRef.current = false;
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isTranscribing,
    accumulatedText,
    connectionStatus,
    connect,
    disconnect,
    startTranscription,
    endTranscription,
    sendAudioChunk,
    subscribeToSession
  };
}