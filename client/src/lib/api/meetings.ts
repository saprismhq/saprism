import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys, invalidateQueries, handleApiError } from "./base";
import { apiRequest } from "@/lib/queryClient";
import type { Meeting, MeetingWithNotes, InsertMeeting } from "@shared/schema";

// Meeting API functions
export const meetingsApi = {
  getAll: async (): Promise<Meeting[]> => {
    const response = await fetch("/api/meetings");
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  getById: async (id: number): Promise<MeetingWithNotes> => {
    const response = await fetch(`/api/meetings/${id}`);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  create: async (meeting: Omit<InsertMeeting, "userId" | "status">): Promise<Meeting> => {
    return apiRequest("/api/meetings", {
      method: "POST",
      body: JSON.stringify(meeting),
    });
  },

  update: async (id: number, updates: Partial<InsertMeeting>): Promise<Meeting> => {
    return apiRequest(`/api/meetings/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest(`/api/meetings/${id}`, {
      method: "DELETE",
    });
  },
};

// Custom hooks
export const useMeetings = () => {
  return useQuery({
    queryKey: queryKeys.meetings.lists(),
    queryFn: meetingsApi.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMeeting = (id: number | null) => {
  return useQuery({
    queryKey: queryKeys.meetings.detail(id!),
    queryFn: () => meetingsApi.getById(id!),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meetingsApi.create,
    onSuccess: (newMeeting) => {
      // Optimistic update to meetings list
      queryClient.setQueryData<Meeting[]>(
        queryKeys.meetings.lists(),
        (old) => old ? [newMeeting, ...old] : [newMeeting]
      );
      
      // Invalidate to ensure fresh data
      invalidateQueries.meetings();
    },
    onError: (error) => {
      console.error("Failed to create meeting:", handleApiError(error));
    },
  });
};

export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<InsertMeeting> }) =>
      meetingsApi.update(id, updates),
    onSuccess: (updatedMeeting) => {
      // Update specific meeting cache
      queryClient.setQueryData(
        queryKeys.meetings.detail(updatedMeeting.id),
        (old: MeetingWithNotes | undefined) => 
          old ? { ...old, ...updatedMeeting } : undefined
      );
      
      // Update meetings list
      queryClient.setQueryData<Meeting[]>(
        queryKeys.meetings.lists(),
        (old) => old?.map(meeting => 
          meeting.id === updatedMeeting.id ? updatedMeeting : meeting
        )
      );
    },
    onError: (error) => {
      console.error("Failed to update meeting:", handleApiError(error));
    },
  });
};

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meetingsApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove from meetings list
      queryClient.setQueryData<Meeting[]>(
        queryKeys.meetings.lists(),
        (old) => old?.filter(meeting => meeting.id !== deletedId)
      );
      
      // Remove specific meeting cache
      queryClient.removeQueries({ queryKey: queryKeys.meetings.detail(deletedId) });
      
      // Clean up related data
      invalidateQueries.notes(deletedId);
      invalidateQueries.ai(deletedId);
    },
    onError: (error) => {
      console.error("Failed to delete meeting:", handleApiError(error));
    },
  });
};