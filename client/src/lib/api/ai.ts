import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys, invalidateQueries, handleApiError } from "./base";
import { apiRequest } from "@/lib/queryClient";
import type { AIAnalysisResult, CoachingSuggestionContent } from "@shared/schema";

// AI API functions
export const aiApi = {
  analyzeNotes: async (params: { meetingId: number; content: string }): Promise<AIAnalysisResult> => {
    const response = await apiRequest("POST", `/api/ai/analyze`, { 
      meetingId: params.meetingId, 
      content: params.content 
    });
    return response.json();
  },

  getAnalysisResult: async (meetingId: number): Promise<AIAnalysisResult | null> => {
    // Get existing analysis from notes endpoint instead of triggering new analysis
    const response = await apiRequest("GET", `/api/meetings/${meetingId}`);
    const meetingData = await response.json();
    return meetingData.notes?.[0]?.aiAnalysis || null;
  },

  generateCoaching: async (meetingId: number): Promise<CoachingSuggestionContent> => {
    const response = await apiRequest("POST", `/api/ai/coaching`, { meetingId });
    return response.json();
  },

  generateFollowUp: async (meetingId: number): Promise<{ questions: string[] }> => {
    const response = await apiRequest("POST", `/api/ai/follow-up`, { meetingId });
    return response.json();
  },
};

// Custom hooks
export const useAnalyzeNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiApi.analyzeNotes,
    onSuccess: (analysis, params) => {
      const meetingId = params.meetingId;
      // Cache the analysis result
      queryClient.setQueryData(
        queryKeys.ai.analysis(meetingId),
        analysis
      );
      
      // Invalidate meeting details to show updated analysis
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.meetings.detail(meetingId) 
      });
      
      // Invalidate notes to show updated AI analysis
      invalidateQueries.notes(meetingId);
    },
    onError: (error) => {
      console.error("Failed to analyze notes:", handleApiError(error));
    },
  });
};

export const useGenerateCoaching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiApi.generateCoaching,
    onSuccess: (coaching, meetingId) => {
      // Cache the coaching suggestions
      queryClient.setQueryData(
        queryKeys.ai.coaching(meetingId),
        coaching
      );
      
      // Invalidate meeting details to show new coaching suggestions
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.meetings.detail(meetingId) 
      });
    },
    onError: (error) => {
      console.error("Failed to generate coaching:", handleApiError(error));
    },
  });
};

export const useGenerateFollowUp = () => {
  return useMutation({
    mutationFn: aiApi.generateFollowUp,
    onError: (error) => {
      console.error("Failed to generate follow-up questions:", handleApiError(error));
    },
  });
};

// Query hooks for cached data
export const useAnalysisResult = (meetingId: number | null) => {
  return useQuery({
    queryKey: queryKeys.ai.analysis(meetingId!),
    queryFn: () => aiApi.getAnalysisResult(meetingId!),
    enabled: false, // Only fetch when explicitly triggered
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCoachingSuggestions = (meetingId: number | null) => {
  return useQuery({
    queryKey: queryKeys.ai.coaching(meetingId!),
    queryFn: () => aiApi.generateCoaching(meetingId!),
    enabled: false, // Only fetch when explicitly triggered
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};