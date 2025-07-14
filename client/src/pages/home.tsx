import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Sidebar } from "@/components/sidebar";
import { NotesPanel } from "@/components/notes-panel";
import { CoachingPanel } from "@/components/coaching-panel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Meeting, MeetingWithNotes } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null);

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

  // Query for meetings
  const { data: meetings, isLoading: meetingsLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
    enabled: isAuthenticated,
  });

  // Query for active meeting details
  const { data: activeMeeting, isLoading: activeMeetingLoading } = useQuery<MeetingWithNotes>({
    queryKey: ["/api/meetings", activeMeetingId],
    enabled: !!activeMeetingId,
  });

  // Create new meeting mutation
  const createMeetingMutation = useMutation({
    mutationFn: async (meetingData: { clientName: string; clientCompany: string }) => {
      const response = await apiRequest("POST", "/api/meetings", meetingData);
      return response.json();
    },
    onSuccess: (meeting: Meeting) => {
      // Invalidate meetings query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      setActiveMeetingId(meeting.id);
      toast({
        title: "Meeting Created",
        description: `Started new meeting with ${meeting.clientName}`,
      });
    },
    onError: (error) => {
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
    },
  });

  // Delete meeting mutation
  const deleteMeetingMutation = useMutation({
    mutationFn: async (meetingId: number) => {
      const response = await apiRequest("DELETE", `/api/meetings/${meetingId}`);
      return response.json();
    },
    onSuccess: (_, deletedMeetingId) => {
      // Invalidate meetings query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      // If the deleted meeting was active, clear the active meeting
      if (activeMeetingId === deletedMeetingId) {
        setActiveMeetingId(null);
      }
      toast({
        title: "Meeting Deleted",
        description: "Meeting has been successfully deleted",
      });
    },
    onError: (error) => {
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
        description: "Failed to delete meeting",
        variant: "destructive",
      });
    },
  });

  // Auto-select first meeting if none selected
  useEffect(() => {
    if (meetings && meetings.length > 0 && !activeMeetingId) {
      setActiveMeetingId(meetings[0].id);
    }
  }, [meetings, activeMeetingId]);

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
            meeting={activeMeeting}
            isLoading={activeMeetingLoading}
          />
        </main>
        
        <CoachingPanel
          meeting={activeMeeting}
          isLoading={activeMeetingLoading}
        />
      </div>
    </div>
  );
}
