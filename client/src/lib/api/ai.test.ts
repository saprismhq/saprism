import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { aiApi, useAnalyzeNotes, useGenerateCoaching, useGenerateFollowUp, useAnalysisResult, useCoachingSuggestions } from './ai';

// Mock the apiRequest function
jest.mock('@/lib/queryClient', () => ({
  apiRequest: jest.fn(),
}));

const { apiRequest } = require('@/lib/queryClient');

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('AI API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('aiApi', () => {
    describe('analyzeNotes', () => {
      it('should call analyze notes API correctly', async () => {
        const mockResponse = {
          json: jest.fn().mockResolvedValue({
            dealStage: 'discovery',
            painPoints: ['pain1', 'pain2'],
            budget: '100k-500k',
            timeline: 'Q1 2024',
            keyStakeholders: ['stakeholder1'],
            sentiment: 4,
            confidence: 0.8,
          }),
        };
        (apiRequest as any).mockResolvedValue(mockResponse);

        const result = await aiApi.analyzeNotes(1);

        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/analyze', { meetingId: 1 });
        expect(result).toEqual({
          dealStage: 'discovery',
          painPoints: ['pain1', 'pain2'],
          budget: '100k-500k',
          timeline: 'Q1 2024',
          keyStakeholders: ['stakeholder1'],
          sentiment: 4,
          confidence: 0.8,
        });
      });

      it('should handle API errors', async () => {
        const error = new Error('API Error');
        (apiRequest as any).mockRejectedValue(error);

        await expect(aiApi.analyzeNotes(1)).rejects.toThrow('API Error');
        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/analyze', { meetingId: 1 });
      });
    });

    describe('generateCoaching', () => {
      it('should call generate coaching API correctly', async () => {
        const mockResponse = {
          json: jest.fn().mockResolvedValue({
            questions: ['question1', 'question2'],
            painMapping: [],
            framing: {
              context: 'test context',
              suggestion: 'test suggestion',
              valueProposition: 'test value',
              differentiators: ['diff1', 'diff2'],
            },
            nextSteps: [],
          }),
        };
        (apiRequest as any).mockResolvedValue(mockResponse);

        const result = await aiApi.generateCoaching(1);

        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/coaching', { meetingId: 1 });
        expect(result).toEqual({
          questions: ['question1', 'question2'],
          painMapping: [],
          framing: {
            context: 'test context',
            suggestion: 'test suggestion',
            valueProposition: 'test value',
            differentiators: ['diff1', 'diff2'],
          },
          nextSteps: [],
        });
      });

      it('should handle API errors', async () => {
        const error = new Error('API Error');
        (apiRequest as any).mockRejectedValue(error);

        await expect(aiApi.generateCoaching(1)).rejects.toThrow('API Error');
        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/coaching', { meetingId: 1 });
      });
    });

    describe('generateFollowUp', () => {
      it('should call generate follow-up API correctly', async () => {
        const mockResponse = {
          json: jest.fn().mockResolvedValue({
            questions: ['follow-up1', 'follow-up2', 'follow-up3'],
          }),
        };
        (apiRequest as any).mockResolvedValue(mockResponse);

        const result = await aiApi.generateFollowUp(1);

        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/follow-up', { meetingId: 1 });
        expect(result).toEqual({
          questions: ['follow-up1', 'follow-up2', 'follow-up3'],
        });
      });

      it('should handle API errors', async () => {
        const error = new Error('API Error');
        (apiRequest as any).mockRejectedValue(error);

        await expect(aiApi.generateFollowUp(1)).rejects.toThrow('API Error');
        expect(apiRequest).toHaveBeenCalledWith('POST', '/api/ai/follow-up', { meetingId: 1 });
      });
    });
  });

  describe('useAnalyzeNotes', () => {
    it('should return mutation with correct configuration', () => {
      const { result } = renderHook(() => useAnalyzeNotes(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should handle successful mutation', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({
          dealStage: 'discovery',
          painPoints: ['pain1'],
          budget: '100k-500k',
          timeline: 'Q1 2024',
          keyStakeholders: ['stakeholder1'],
          sentiment: 4,
          confidence: 0.8,
        }),
      };
      (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAnalyzeNotes(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should handle mutation error', async () => {
      const error = new Error('API Error');
      (apiRequest as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useAnalyzeNotes(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });
    });
  });

  describe('useGenerateCoaching', () => {
    it('should return mutation with correct configuration', () => {
      const { result } = renderHook(() => useGenerateCoaching(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should handle successful mutation', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({
          questions: ['question1'],
          painMapping: [],
          framing: {
            context: 'test context',
            suggestion: 'test suggestion',
            valueProposition: 'test value',
            differentiators: ['diff1'],
          },
          nextSteps: [],
        }),
      };
      (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGenerateCoaching(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });

  describe('useGenerateFollowUp', () => {
    it('should return mutation with correct configuration', () => {
      const { result } = renderHook(() => useGenerateFollowUp(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should handle successful mutation', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({
          questions: ['follow-up1', 'follow-up2'],
        }),
      };
      (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGenerateFollowUp(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });

  describe('useAnalysisResult', () => {
    it('should return query with correct configuration', () => {
      const { result } = renderHook(() => useAnalysisResult(1), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.data).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should be disabled by default', () => {
      const { result } = renderHook(() => useAnalysisResult(1), { wrapper });

      expect(result.current.isFetching).toBe(false);
    });
  });

  describe('useCoachingSuggestions', () => {
    it('should return query with correct configuration', () => {
      const { result } = renderHook(() => useCoachingSuggestions(1), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.data).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
    });

    it('should be disabled by default', () => {
      const { result } = renderHook(() => useCoachingSuggestions(1), { wrapper });

      expect(result.current.isFetching).toBe(false);
    });
  });
});
