import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Meeting, Client } from '@shared/schema';
import { isUnauthorizedError } from '@/lib/authUtils';

interface RecentMeetingsListProps {
  selectedClient: Client | null;
  activeMeetingId: number | null;
  onSelectMeeting: (meetingId: number) => void;
  className?: string;
}

/**
 * RecentMeetingsList component displays meetings for the selected client
 * Fetches meetings from the backend based on the selected client
 * Includes meeting selection and deletion functionality
 */
export function RecentMeetingsList({ 
  selectedClient, 
  activeMeetingId, 
  onSelectMeeting,
  className 
}: RecentMeetingsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteMeetingLoading, setDeleteMeetingLoading] = useState(false);

  // Fetch meetings for the selected client
  const { 
    data: meetings = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['/api/clients', selectedClient?.id, 'meetings'],
    queryFn: async () => {
      if (!selectedClient?.id) return [];
      const response = await apiRequest('GET', `/api/clients/${selectedClient.id}/meetings`);
      return response.json() as Promise<Meeting[]>;
    },
    enabled: !!selectedClient?.id, // Only fetch when a client is selected
    retry: 1,
  });

  // Delete meeting mutation
  const deleteMeetingMutation = useMutation({
    mutationFn: async (meetingId: number) => {
      const response = await apiRequest('DELETE', `/api/meetings/${meetingId}`);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['/api/meetings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/clients', selectedClient?.id, 'meetings'] });
      
      toast({
        title: 'Success',
        description: 'Meeting deleted successfully.',
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: 'Unauthorized',
          description: 'You are logged out. Logging in again...',
          variant: 'destructive',
        });
        setTimeout(() => {
          window.location.href = '/api/login';
        }, 500);
        return;
      }
      
      console.error('Error deleting meeting:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete meeting. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setDeleteMeetingLoading(false);
    },
  });

  // Handle meeting deletion
  const handleDeleteMeeting = (meetingId: number) => {
    setDeleteMeetingLoading(true);
    deleteMeetingMutation.mutate(meetingId);
  };

  // Show empty state when no client is selected
  if (!selectedClient) {
    return (
      <div className={className}>
        <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Recent Meetings
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">Select a client to view their meetings</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={className}>
        <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Recent Meetings
        </h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={className}>
        <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Recent Meetings
        </h3>
        <div className="text-center py-8 text-red-600">
          <p className="text-sm mb-2">Failed to load meetings</p>
          <button 
            onClick={() => refetch()} 
            className="text-xs underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state when no meetings exist for this client
  if (meetings.length === 0) {
    return (
      <div className={className}>
        <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Recent Meetings
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No meetings found for {selectedClient.name}</p>
          <p className="text-xs mt-1">Create a new meeting to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
        Recent Meetings
      </h3>
      
      <div className="space-y-1 max-h-72 overflow-y-auto">
        {meetings.slice(0, 10).map((meeting) => (
          <div
            key={meeting.id}
            className={`relative group rounded-lg transition-colors ${
              meeting.id === activeMeetingId
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <button
              onClick={() => onSelectMeeting(meeting.id)}
              className="w-full text-left px-3 py-3 pr-10 rounded-lg text-sm"
            >
              <div className="font-medium">{meeting.clientName}</div>
              {meeting.clientCompany && (
                <div className="text-xs text-gray-500 mt-1">{meeting.clientCompany}</div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(meeting.createdAt).toLocaleDateString()} • {new Date(meeting.createdAt).toLocaleTimeString('en-US', { 
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </button>
            
            {/* Delete button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                  disabled={deleteMeetingLoading}
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the meeting with {meeting.clientName}? 
                    This action cannot be undone and will permanently remove all notes and coaching suggestions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
      
      {meetings.length > 10 && (
        <div className="text-xs text-gray-400 text-center mt-2">
          Showing 10 of {meetings.length} meetings
        </div>
      )}
    </div>
  );
}