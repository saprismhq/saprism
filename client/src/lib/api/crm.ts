import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys, invalidateQueries, handleApiError } from "./base";
import { apiRequest } from "@/lib/queryClient";

// CRM API types
export interface CrmStatus {
  connected: boolean;
  error?: string;
  lastSync?: string;
}

export interface CrmSyncResult {
  success: boolean;
  message: string;
  recordId?: string;
  error?: string;
}

// CRM API functions
export const crmApi = {
  getStatus: async (): Promise<CrmStatus> => {
    const response = await fetch("/api/crm/status");
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  syncMeeting: async (meetingId: number): Promise<CrmSyncResult> => {
    return apiRequest(`/api/crm/sync`, {
      method: "POST",
      body: JSON.stringify({ meetingId }),
    });
  },

  testConnection: async (): Promise<CrmStatus> => {
    return apiRequest("/api/crm/test", {
      method: "POST",
    });
  },
};

// Custom hooks
export const useCrmStatus = () => {
  return useQuery({
    queryKey: queryKeys.crm.status(),
    queryFn: crmApi.getStatus,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useSyncToCrm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crmApi.syncMeeting,
    onSuccess: (result, meetingId) => {
      // Update CRM status if sync was successful
      if (result.success) {
        queryClient.setQueryData<CrmStatus>(
          queryKeys.crm.status(),
          (old) => old ? { ...old, lastSync: new Date().toISOString() } : undefined
        );
      }
      
      // Invalidate meeting details to show sync status
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.meetings.detail(meetingId) 
      });
      
      // Cache the sync result temporarily
      queryClient.setQueryData(
        queryKeys.crm.sync(meetingId),
        result
      );
    },
    onError: (error) => {
      console.error("Failed to sync to CRM:", handleApiError(error));
    },
  });
};

export const useTestCrmConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crmApi.testConnection,
    onSuccess: (status) => {
      // Update CRM status with test result
      queryClient.setQueryData(queryKeys.crm.status(), status);
    },
    onError: (error) => {
      console.error("Failed to test CRM connection:", handleApiError(error));
    },
  });
};