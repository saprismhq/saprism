import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  MonitorOff,
  Users,
  Settings
} from 'lucide-react';
import { useServices } from '@/lib/services/ServiceContainer';
import type { Participant, SessionContext } from '@/lib/services/types';
import type { MeetingWithSessions } from '@shared/schema';
import { useTranscriptionWebSocket } from '@/hooks/useTranscriptionWebSocket';
import { useTranscriptionWebSocket as useTranscriptionContext } from '@/contexts/TranscriptionWebSocketContext';
import { getConfig } from '@/config';
import { nanoid } from 'nanoid';

interface CallInterfaceProps {
  meeting: MeetingWithSessions | undefined;
  isLoading: boolean;
  onSessionUpdate?: (context: SessionContext) => void;
  onTranscriptionUpdate?: (text: string) => void;
}

// Helper function to format transcription into clean bullet-point notes
function formatTranscriptionAsNotes(rawTranscription: string): string {
  if (!rawTranscription) return '';
  
  // Parse the accumulated transcription text and format as clean bullet points
  const lines = rawTranscription
    .split('\n')
    .filter(line => line.trim() && line.includes(']')) // Only lines with timestamps
    .map(line => line.trim());
  
  // Convert timestamp lines to bullet points, filtering out empty or meaningless text
  const bulletPoints = lines.map(line => {
    // Extract the text after the timestamp
    const match = line.match(/\[(\d{1,2}:\d{2}:\d{2}\s*[AP]M)\]\s*(.+)/);
    if (match && match[2] && match[2].trim() && match[2].trim().length > 2) {
      return `• [${match[1]}] ${match[2].trim()}`;
    }
    return null;
  }).filter(Boolean);
  
  // Return with proper line breaks: each bullet point on its own line
  return bulletPoints.join('\n');
}

export function CallInterface({ meeting, isLoading, onSessionUpdate, onTranscriptionUpdate }: CallInterfaceProps) {
  const { toast } = useToast();
  const { callService, sessionService } = useServices();
  const { wsRef: contextWsRef, currentSessionId: contextSessionId, setCurrentSessionId } = useTranscriptionContext();
  const config = getConfig();
  
  // Call state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [transcriptionSessionId, setTranscriptionSessionId] = useState<string | null>(null);
  
  // Refs for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Transcription WebSocket integration
  const {
    isConnected: transcriptionConnected,
    isTranscribing,
    startTranscription,
    endTranscription,
    connect: connectTranscription
  } = useTranscriptionWebSocket({
    onTranscriptionChunk: (text, accumulatedText) => {
      console.log('Transcription chunk received:', text);
      // Format transcription as bullet-point notes
      const formattedNotes = formatTranscriptionAsNotes(accumulatedText);
      onTranscriptionUpdate?.(formattedNotes);
    },
    onTranscriptionComplete: (finalText, meetingId) => {
      console.log('Transcription completed:', finalText);
      // Format final transcription as structured notes
      const formattedNotes = formatTranscriptionAsNotes(finalText);
      onTranscriptionUpdate?.(formattedNotes);
      toast({
        title: "Transcription Complete",
        description: "Call transcription has been finalized and added to notes",
      });
    },
    onError: (error) => {
      console.error('Transcription error:', error);
      // Only show toast if we're connected to a call
      if (isConnected) {
        toast({
          title: "Transcription Error",
          description: error,
          variant: "destructive",
        });
      }
    }
  });

  // Set up event listeners
  useEffect(() => {
    callService.onParticipantJoined((participant) => {
      setParticipants(prev => [...prev, participant]);
      toast({
        title: "Participant Joined",
        description: `${participant.name || participant.identity} joined the call`,
      });
    });

    callService.onParticipantLeft((participant) => {
      setParticipants(prev => prev.filter(p => p.sid !== participant.sid));
      toast({
        title: "Participant Left",
        description: `${participant.name || participant.identity} left the call`,
      });
    });

    callService.onConnectionStateChanged((state) => {
      setIsConnected(state === 'connected');
      setIsConnecting(state === 'connecting' || state === 'reconnecting');
    });

    callService.onTranscriptionReceived((text, speaker) => {
      // Handle real-time transcription when implemented
      console.log(`Transcription from ${speaker}: ${text}`);
    });
  }, [callService, sessionService, currentSession, toast]);

  const handleStartCall = async () => {
    if (!meeting) return;

    try {
      setIsConnecting(true);
      
      // Demo mode - simulate connecting to call
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      
      // Simulate successful connection
      setIsConnected(true);
      setIsConnecting(false);
      
      // Create a mock session for demo
      const sessionId = nanoid();
      setCurrentSession({
        id: `demo-session-${Date.now()}`,
        meetingId: meeting.id,
        status: 'active',
        startedAt: new Date()
      });

      // Connect and start transcription
      connectTranscription();
      
      // Set session ID immediately for audio capture
      setTranscriptionSessionId(sessionId);
      // Session ID is now managed by context instead of global variables
      console.log('Set transcription session ID:', sessionId);
      
      // Wait a moment for connection then start transcription
      setTimeout(() => {
        const success = startTranscription(sessionId, meeting.id, 'demo-user');
        console.log('Transcription start result:', success, 'Session ID:', sessionId);
        if (success) {
          toast({
            title: "Transcription Started",
            description: "Real-time transcription is now active",
          });
        } else {
          toast({
            title: "Transcription Error",
            description: "Could not start transcription service",
            variant: "destructive"
          });
        }
      }, 1000);

      // Add a demo participant after a short delay
      setTimeout(() => {
        setParticipants([{
          sid: 'demo-participant',
          identity: meeting.clientName,
          name: meeting.clientName,
          isLocal: false,
          isMuted: false,
          isVideoEnabled: true,
          isSpeaking: false,
          isScreenSharing: false,
          joinedAt: new Date()
        }]);
      }, 3000);

      // Start real audio capture and transcription
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 16000
          } 
        });
        
        // Set up MediaRecorder for audio capture with better settings
        let mediaRecorder;
        const options = [
          { mimeType: 'audio/webm;codecs=opus', container: 'webm' },
          { mimeType: 'audio/mp4;codecs=mp4a.40.2', container: 'mp4' },
          { mimeType: 'audio/ogg;codecs=opus', container: 'ogg' },
          { mimeType: 'audio/webm', container: 'webm' }
        ];
        
        for (const option of options) {
          if (MediaRecorder.isTypeSupported(option.mimeType)) {
            mediaRecorder = new MediaRecorder(stream, {
              mimeType: option.mimeType,
              audioBitsPerSecond: config.audio.audioBitsPerSecond
            });
            console.log('Using audio format:', option.mimeType);
            break;
          }
        }
        
        if (!mediaRecorder) {
          throw new Error('No supported audio format found');
        }
        
        let audioChunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            console.log('MediaRecorder data available, size:', event.data.size);
            audioChunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = async () => {
          console.log('MediaRecorder stopped, audioChunks length:', audioChunks.length);
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            console.log('Created audio blob, size:', audioBlob.size);
            
            // Send audio to transcription service via WebSocket
            // Use context references passed from component level
            const transcriptionWs = contextWsRef.current;
            
            console.log('Audio capture check:', { 
              hasCurrentSession: !!contextSessionId, 
              hasWsRef: !!transcriptionWs,
              wsState: transcriptionWs?.readyState,
              isOpen: transcriptionWs?.readyState === WebSocket.OPEN
            });
            
            if (transcriptionWs?.readyState === WebSocket.OPEN && contextSessionId) {
              try {
                const arrayBuffer = await audioBlob.arrayBuffer();
                console.log('Sending audio chunk, size:', arrayBuffer.byteLength, 'session:', contextSessionId);
                
                transcriptionWs.send(arrayBuffer);
                console.log('Audio data sent successfully');
              } catch (error) {
                console.error('Error sending audio data:', error);
              }
            } else {
              console.log('Cannot send audio - missing WebSocket or session:', {
                hasWs: !!transcriptionWs,
                wsState: transcriptionWs?.readyState,
                hasSession: !!contextSessionId
              });
            }
            audioChunks = [];
          }
        };
        
        // Record audio in chunks for better transcription quality
        const recordingInterval = setInterval(() => {
          console.log('Recording interval triggered, mediaRecorder state:', mediaRecorder.state);
          if (mediaRecorder.state === 'recording') {
            console.log('Stopping recorder to process chunk');
            mediaRecorder.stop();
            setTimeout(() => {
              if (mediaRecorder.state === 'inactive') {
                console.log('Restarting recorder for next chunk');
                mediaRecorder.start();
              }
            }, 100);
          }
        }, config.audio.recordingIntervalMs); // Configurable chunks for better transcription accuracy
        
        // Start recording
        mediaRecorder.start();
        console.log('MediaRecorder started, state:', mediaRecorder.state);
        console.log('Real audio transcription started');
        
        // Store references for cleanup
        (window as any).currentMediaRecorder = mediaRecorder;
        (window as any).currentRecordingInterval = recordingInterval;
        (window as any).currentAudioStream = stream;
        
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access for real-time transcription",
          variant: "destructive",
        });
      }

      toast({
        title: "Call Started (Demo Mode)",
        description: `Connected to demo call with ${meeting.clientName}`,
      });
      
    } catch (error) {
      console.error('Failed to start call:', error);
      toast({
        title: "Call Failed",
        description: "Failed to start the call. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      // Stop audio recording and clean up
      const mediaRecorder = (window as any).currentMediaRecorder;
      const recordingInterval = (window as any).currentRecordingInterval;
      const audioStream = (window as any).currentAudioStream;
      
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
      
      if (audioStream) {
        audioStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
      
      // Clean up global references
      delete (window as any).currentMediaRecorder;
      delete (window as any).currentRecordingInterval;
      delete (window as any).currentAudioStream;
      
      // End transcription if active
      if (transcriptionSessionId && isTranscribing) {
        endTranscription();
        setTranscriptionSessionId(null);
      }

      // Reset state
      setCurrentSession(null);
      setIsConnected(false);
      setParticipants([]);
      setIsMuted(false);
      setIsVideoEnabled(true);
      setIsScreenSharing(false);
      
      toast({
        title: "Call Ended",
        description: "Call transcription has been saved to your notes",
      });
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleToggleMute = async () => {
    try {
      // Demo mode - just toggle state
      setIsMuted(!isMuted);
      toast({
        title: isMuted ? "Unmuted" : "Muted",
        description: `Microphone ${isMuted ? 'enabled' : 'disabled'} (demo)`,
      });
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const handleToggleVideo = async () => {
    try {
      // Demo mode - just toggle state
      setIsVideoEnabled(!isVideoEnabled);
      toast({
        title: isVideoEnabled ? "Video Off" : "Video On",
        description: `Camera ${isVideoEnabled ? 'disabled' : 'enabled'} (demo)`,
      });
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const handleToggleScreenShare = async () => {
    try {
      // Demo mode - just toggle state
      setIsScreenSharing(!isScreenSharing);
      toast({
        title: isScreenSharing ? "Stopped Sharing" : "Screen Sharing",
        description: `Screen share ${isScreenSharing ? 'disabled' : 'enabled'} (demo)`,
      });
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
    }
  };

  if (isLoading || !meeting) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Video Container */}
      <div className="bg-gray-900 rounded-lg overflow-hidden relative h-32 mb-2">
          {isConnected ? (
            <>
              {/* Remote video */}
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
              
              {/* Local video (picture-in-picture) */}
              <div className="absolute top-2 right-2 w-20 h-16 bg-gray-800 rounded overflow-hidden border border-white">
                <video
                  ref={localVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              </div>
              
              {/* Participants overlay */}
              {participants.length > 0 && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{participants.length + 1}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm">Connecting...</p>
                  </>
                ) : (
                  <>
                    <Phone className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Ready to start call</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      {/* Call Controls */}
      <div className="flex items-center justify-center space-x-2">
        {!isConnected ? (
          <Button
            onClick={handleStartCall}
            disabled={isConnecting}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Phone className="w-3 h-3 mr-1" />
            {isConnecting ? 'Connecting...' : 'Start Call'}
          </Button>
        ) : (
          <>
            {/* Mute/Unmute */}
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="sm"
              onClick={handleToggleMute}
              className="h-8 w-8 p-0"
            >
              {isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            </Button>

            {/* Video On/Off */}
            <Button
              variant={!isVideoEnabled ? "destructive" : "outline"}
              size="sm"
              onClick={handleToggleVideo}
              className="h-8 w-8 p-0"
            >
              {isVideoEnabled ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
            </Button>

            {/* Screen Share */}
            <Button
              variant={isScreenSharing ? "default" : "outline"}
              size="sm"
              onClick={handleToggleScreenShare}
              className="h-8 w-8 p-0"
            >
              {isScreenSharing ? <MonitorOff className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
            </Button>

            {/* End Call */}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndCall}
              className="h-8 px-3"
            >
              <PhoneOff className="w-3 h-3 mr-1" />
              End
            </Button>
          </>
        )}
      </div>

      {/* Participants List - Only show when connected and participants exist */}
      {isConnected && participants.length > 0 && (
        <div className="border-t pt-2 mt-2">
          <h4 className="text-xs font-medium text-gray-700 mb-1">Participants</h4>
          <div className="space-y-1 max-h-16 overflow-y-auto">
            {participants.map((participant) => (
              <div key={participant.sid} className="flex items-center justify-between text-xs">
                <span className="text-gray-900 truncate">
                  {participant.name || participant.identity}
                  {participant.isLocal && " (You)"}
                </span>
                <div className="flex space-x-1 text-xs text-gray-500">
                  {participant.isMuted && <MicOff className="w-3 h-3" />}
                  {!participant.isVideoEnabled && <VideoOff className="w-3 h-3" />}
                  {participant.isSpeaking && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}