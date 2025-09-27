import { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface TranscriptionWebSocketContextType {
  wsRef: React.MutableRefObject<WebSocket | null>;
  currentSessionId: string | null;
  setCurrentSessionId: (sessionId: string | null) => void;
}

const TranscriptionWebSocketContext = createContext<TranscriptionWebSocketContextType | null>(null);

export function TranscriptionWebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  return (
    <TranscriptionWebSocketContext.Provider value={{ 
      wsRef, 
      currentSessionId, 
      setCurrentSessionId 
    }}>
      {children}
    </TranscriptionWebSocketContext.Provider>
  );
}

export function useTranscriptionWebSocket() {
  const context = useContext(TranscriptionWebSocketContext);
  if (!context) {
    throw new Error('useTranscriptionWebSocket must be used within a TranscriptionWebSocketProvider');
  }
  return context;
}