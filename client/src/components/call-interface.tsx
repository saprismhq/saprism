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

interface CallInterfaceProps {
  meeting: MeetingWithSessions | undefined;
  isLoading: boolean;
  onSessionUpdate?: (context: SessionContext) => void;
}

export function CallInterface({ meeting, isLoading, onSessionUpdate }: CallInterfaceProps) {
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
  
  // Refs for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

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
      
      // Create call session
      const session = await sessionService.createSession(meeting.id);
      setCurrentSession(session);
      
      // Generate room name and get token from backend
      const roomName = `meeting-${meeting.id}-${session.id}`;
      
      // TODO: Get actual token from backend
      const token = 'placeholder-token'; // This should come from your backend
      
      // Connect to LiveKit room
      await callService.connect(roomName, token);
      
      // Update session status
      await sessionService.updateSession(session.id, {
        status: 'active',
        startedAt: new Date(),
        liveKitRoomName: roomName
      });

      toast({
        title: "Call Started",
        description: `Connected to call for ${meeting.clientName}`,
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
      await callService.disconnect();
      
      if (currentSession) {
        await sessionService.endSession(currentSession.id);
        setCurrentSession(null);
      }
      
      // Reset state
      setIsConnected(false);
      setParticipants([]);
      setIsMuted(false);
      setIsVideoEnabled(true);
      setIsScreenSharing(false);
      
      toast({
        title: "Call Ended",
        description: "Call has been disconnected",
      });
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleToggleMute = async () => {
    try {
      await callService.toggleMute();
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const handleToggleVideo = async () => {
    try {
      await callService.toggleVideo();
      setIsVideoEnabled(!isVideoEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const handleToggleScreenShare = async () => {
    try {
      await callService.toggleScreenShare();
      setIsScreenSharing(!isScreenSharing);
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
    <div className="h-full flex flex-col space-y-2 overflow-hidden">
      {/* Video Container */}
      <div className="bg-gray-900 rounded-lg overflow-hidden relative h-32">
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
        <div className="border-t pt-2">
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