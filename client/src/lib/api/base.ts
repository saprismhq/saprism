import { queryClient } from "@/lib/queryClient";

// Base API configuration
export const API_BASE_URL = "/api";

// Query keys factory for consistent cache management
export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
  
  // Meetings
  meetings: {
    all: ["meetings"] as const,
    lists: () => [...queryKeys.meetings.all, "list"] as const,
    list: (filters: Record<string, any> = {}) => 
      [...queryKeys.meetings.lists(), filters] as const,
    details: () => [...queryKeys.meetings.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.meetings.details(), id] as const,
  },
  
  // Notes
  notes: {
    all: ["notes"] as const,
    lists: () => [...queryKeys.notes.all, "list"] as const,
    byMeeting: (meetingId: number) => 
      [...queryKeys.notes.lists(), "meeting", meetingId] as const,
  },
  
  // AI Analysis
  ai: {
    all: ["ai"] as const,
    analysis: (meetingId: number) => 
      [...queryKeys.ai.all, "analysis", meetingId] as const,
    coaching: (meetingId: number) => 
      [...queryKeys.ai.all, "coaching", meetingId] as const,
  },
  
  // CRM
  crm: {
    all: ["crm"] as const,
    status: () => [...queryKeys.crm.all, "status"] as const,
    sync: (meetingId: number) => 
      [...queryKeys.crm.all, "sync", meetingId] as const,
  },
  
  // System Status
  status: {
    all: ["status"] as const,
    services: () => [...queryKeys.status.all, "services"] as const,
  },
} as const;

// Cache invalidation helpers
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.all }),
  meetings: () => queryClient.invalidateQueries({ queryKey: queryKeys.meetings.all }),
  notes: (meetingId?: number) => {
    if (meetingId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.byMeeting(meetingId) });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.all });
    }
  },
  ai: (meetingId?: number) => {
    if (meetingId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.analysis(meetingId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.coaching(meetingId) });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.all });
    }
  },
  crm: () => queryClient.invalidateQueries({ queryKey: queryKeys.crm.all }),
  status: () => queryClient.invalidateQueries({ queryKey: queryKeys.status.all }),
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

// Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}