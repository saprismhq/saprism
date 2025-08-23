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
import { nanoid } from 'nanoid';

interface CallInterfaceProps {
  meeting: MeetingWithSessions | undefined;
  isLoading: boolean;
  onSessionUpdate?: (context: SessionContext) => void;
  onTranscriptionUpdate?: (text: string) => void;
}

export function CallInterface({ meeting, isLoading, onSessionUpdate, onTranscriptionUpdate }: CallInterfaceProps) {
  const { toast } = useToast();
  const { callService, sessionService } = useServices();
  
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
      onTranscriptionUpdate?.(accumulatedText);
    },
    onTranscriptionComplete: (finalText, meetingId) => {
      console.log('Transcription completed:', finalText);
      onTranscriptionUpdate?.(finalText);
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
      
      // Wait a moment for connection then start transcription
      setTimeout(() => {
        const success = startTranscription(sessionId, meeting.id, 'demo-user');
        if (success) {
          setTranscriptionSessionId(sessionId);
          toast({
            title: "Transcription Started",
            description: "Real-time transcription is now active",
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

      // Simulate demo transcription chunks over time
      let demoTranscripts = [
        "[12:30:15] Hello, thank you for joining the call today.",
        "[12:30:18] How are you doing? I hope you're having a great day.",
        "[12:30:25] Let's talk about your current challenges and how we can help.",
        "[12:30:32] I understand you're looking for a solution that can scale with your business.",
        "[12:30:40] Our platform offers exactly what you need - reliability and growth potential.",
        "[12:30:48] What specific pain points are you experiencing right now?",
        "[12:30:55] That's a common challenge many of our clients face initially.",
        "[12:31:03] We can definitely address that with our enterprise features.",
        "[12:31:10] The implementation typically takes 2-3 weeks depending on complexity.",
        "[12:31:18] What's your timeline for getting this implemented?"
      ];

      let accumulatedDemo = "";
      demoTranscripts.forEach((transcript, index) => {
        setTimeout(() => {
          accumulatedDemo += (accumulatedDemo ? '\n' : '') + transcript;
          if (onTranscriptionUpdate) {
            onTranscriptionUpdate(accumulatedDemo);
          }
        }, 5000 + (index * 3000)); // Start after 5s, then every 3s
      });

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
      // End transcription if active
      if (transcriptionSessionId && isTranscribing) {
        endTranscription();
        setTranscriptionSessionId(null);
      }

      // Demo mode - simulate ending call
      setCurrentSession(null);
      
      // Reset state
      setIsConnected(false);
      setParticipants([]);
      setIsMuted(false);
      setIsVideoEnabled(true);
      setIsScreenSharing(false);
      
      toast({
        title: "Call Ended (Demo Mode)",
        description: "Demo call has been disconnected",
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