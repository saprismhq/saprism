import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys, invalidateQueries, handleApiError } from "./base";
import { apiRequest } from "@/lib/queryClient";
import type { Meeting, MeetingWithSessions, CreateMeeting } from "@shared/schema";

// Meeting API functions
export const meetingsApi = {
  getAll: async (): Promise<Meeting[]> => {
    const response = await fetch("/api/meetings", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  getById: async (id: number): Promise<MeetingWithSessions> => {
    const response = await fetch(`/api/meetings/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  create: async (meeting: CreateMeeting): Promise<Meeting> => {
    const response = await apiRequest("POST", "/api/meetings", meeting);
    return response.json();
  },

  update: async (id: number, updates: Partial<CreateMeeting>): Promise<Meeting> => {
    const response = await apiRequest("PATCH", `/api/meetings/${id}`, updates);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/meetings/${id}`);
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
    mutationFn: ({ id, updates }: { id: number; updates: Partial<CreateMeeting> }) =>
      meetingsApi.update(id, updates),
    onSuccess: (updatedMeeting) => {
      // Update specific meeting cache
      queryClient.setQueryData(
        queryKeys.meetings.detail(updatedMeeting.id),
        (old: MeetingWithSessions | undefined) => 
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