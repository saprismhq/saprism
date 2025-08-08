import { useQuery } from "@tanstack/react-query";
import { queryKeys, handleApiError } from "./base";

// Service status types
export interface ServiceStatus {
  name: string;
  connected: boolean;
  error?: string;
  lastCheck?: string;
}

export interface SystemStatus {
  services: {
    salesforce: ServiceStatus;
    openai: ServiceStatus;
  };
  overallHealth: 'healthy' | 'degraded' | 'down';
}

// Status API functions
export const statusApi = {
  getSystemStatus: async (): Promise<SystemStatus> => {
    const response = await fetch("/api/status");
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
};

// Custom hooks
export const useSystemStatus = () => {
  return useQuery({
    queryKey: queryKeys.status.services(),
    queryFn: statusApi.getSystemStatus,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 45 * 1000, // Refetch every 45 seconds
    retry: 2,
  });
};

// Helper functions
export const getServiceStatusIcon = (status: ServiceStatus) => {
  return status.connected ? "🟢" : "🔴";
};

export const getOverallStatusColor = (status: SystemStatus) => {
  switch (status.overallHealth) {
    case 'healthy':
      return 'text-green-600 bg-green-50';
    case 'degraded':
      return 'text-yellow-600 bg-yellow-50';
    case 'down':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};