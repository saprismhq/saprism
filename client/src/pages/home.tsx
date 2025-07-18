import { useEffect, useState } from "react";
import { useAuth, useMeetings, useMeeting, useCreateMeeting, useDeleteMeeting } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Sidebar } from "@/components/sidebar";
import { NotesPanel } from "@/components/notes-panel";
import { CoachingPanel } from "@/components/coaching-panel";
import type { Meeting, MeetingWithNotes } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Query for meetings using organized API
  const { data: meetings, isLoading: meetingsLoading } = useMeetings();

  // Query for active meeting details using organized API
  const { data: activeMeeting, isLoading: activeMeetingLoading } = useMeeting(activeMeetingId);

  // Create new meeting mutation using organized API
  const createMeetingMutation = useCreateMeeting();

  // Enhanced success handler for meeting creation
  const handleMeetingCreated = (meeting: Meeting) => {
    setActiveMeetingId(meeting.id);
    toast({
      title: "Meeting Created",
      description: `Started new meeting with ${meeting.clientName}`,
    });
  };

  // Enhanced error handler
  const handleMeetingError = (error: any) => {
    if (isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
    toast({
      title: "Error",
      description: "Failed to create meeting",
      variant: "destructive",
    });
  };

  // Delete meeting mutation using organized API
  const deleteMeetingMutation = useDeleteMeeting();

  // Enhanced delete handler
  const handleMeetingDeleted = (deletedMeetingId: number) => {
    // Clear active meeting if it was deleted
    if (activeMeetingId === deletedMeetingId) {
      setActiveMeetingId(null);
    }
    toast({
      title: "Meeting Deleted",
      description: "Meeting has been successfully deleted",
    });
  };

  // Auto-select first meeting if none selected
  useEffect(() => {
    if (meetings && meetings.length > 0 && !activeMeetingId) {
      setActiveMeetingId(meetings[0].id);
    }
  }, [meetings, activeMeetingId]);

  // Handle mutation success/error events
  useEffect(() => {
    if (createMeetingMutation.isSuccess && createMeetingMutation.data) {
      handleMeetingCreated(createMeetingMutation.data);
    }
    if (createMeetingMutation.isError) {
      handleMeetingError(createMeetingMutation.error);
    }
  }, [createMeetingMutation.isSuccess, createMeetingMutation.isError, createMeetingMutation.data, createMeetingMutation.error]);

  useEffect(() => {
    if (deleteMeetingMutation.isSuccess && deleteMeetingMutation.variables) {
      handleMeetingDeleted(deleteMeetingMutation.variables);
    }
    if (deleteMeetingMutation.isError) {
      handleMeetingError(deleteMeetingMutation.error);
    }
  }, [deleteMeetingMutation.isSuccess, deleteMeetingMutation.isError, deleteMeetingMutation.variables, deleteMeetingMutation.error]);

  if (isLoading || meetingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar
          meetings={meetings || []}
          activeMeetingId={activeMeetingId}
          onSelectMeeting={setActiveMeetingId}
          onCreateMeeting={createMeetingMutation.mutate}
          onDeleteMeeting={deleteMeetingMutation.mutate}
          createMeetingLoading={createMeetingMutation.isPending}
          deleteMeetingLoading={deleteMeetingMutation.isPending}
        />
        
        <main className="flex-1 overflow-hidden">
          <NotesPanel
            key={activeMeetingId}
            meeting={activeMeeting}
            isLoading={activeMeetingLoading}
            onAnalyzing={setIsAnalyzing}
          />
        </main>
        
        <CoachingPanel
          key={activeMeetingId}
          meeting={activeMeeting}
          isLoading={activeMeetingLoading}
          isAnalyzing={isAnalyzing}
        />
      </div>
    </div>
  );
}
