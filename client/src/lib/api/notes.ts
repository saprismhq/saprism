import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys, invalidateQueries, handleApiError } from "./base";
import { apiRequest } from "@/lib/queryClient";
import type { Note, InsertNote } from "@shared/schema";

// Notes API functions
export const notesApi = {
  getByMeeting: async (meetingId: number): Promise<Note[]> => {
    const response = await fetch(`/api/notes?meetingId=${meetingId}`);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  create: async (note: Omit<InsertNote, "id">): Promise<Note> => {
    const response = await apiRequest("POST", "/api/notes", note);
    return response.json();
  },

  update: async (id: number, updates: Partial<InsertNote>): Promise<Note> => {
    const response = await apiRequest("PATCH", `/api/notes/${id}`, updates);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/notes/${id}`, {});
  },
};

// Custom hooks
export const useNotes = (meetingId: number | null) => {
  return useQuery({
    queryKey: queryKeys.notes.byMeeting(meetingId!),
    queryFn: () => notesApi.getByMeeting(meetingId!),
    enabled: !!meetingId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.create,
    onSuccess: (newNote) => {
      // Optimistic update to notes list
      queryClient.setQueryData<Note[]>(
        queryKeys.notes.byMeeting(newNote.meetingId),
        (old) => old ? [newNote, ...old] : [newNote]
      );
      
      // Update meeting details if cached
      queryClient.setQueryData(
        queryKeys.meetings.detail(newNote.meetingId),
        (old: any) => old ? {
          ...old,
          notes: [newNote, ...(old.notes || [])]
        } : undefined
      );
    },
    onError: (error) => {
      console.error("Failed to create note:", handleApiError(error));
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<InsertNote> }) =>
      notesApi.update(id, updates),
    onSuccess: (updatedNote) => {
      // Update notes list
      queryClient.setQueryData<Note[]>(
        queryKeys.notes.byMeeting(updatedNote.meetingId),
        (old) => old?.map(note => 
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      
      // Update meeting details if cached
      queryClient.setQueryData(
        queryKeys.meetings.detail(updatedNote.meetingId),
        (old: any) => old ? {
          ...old,
          notes: old.notes?.map((note: Note) => 
            note.id === updatedNote.id ? updatedNote : note
          )
        } : undefined
      );
    },
    onError: (error) => {
      console.error("Failed to update note:", handleApiError(error));
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove from all notes lists (we don't know which meeting)
      queryClient.setQueriesData<Note[]>(
        { queryKey: queryKeys.notes.all },
        (old) => old?.filter(note => note.id !== deletedId)
      );
      
      // Remove from meeting details
      queryClient.setQueriesData(
        { queryKey: queryKeys.meetings.details() },
        (old: any) => old ? {
          ...old,
          notes: old.notes?.filter((note: Note) => note.id !== deletedId)
        } : undefined
      );
    },
    onError: (error) => {
      console.error("Failed to delete note:", handleApiError(error));
    },
  });
};