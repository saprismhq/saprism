// AI Provider interface - abstraction for all AI service providers

import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../../shared/schema';

// Common options for AI operations
export interface AIOperationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  timeout?: number;
}

// Enhanced options for specific operations
export interface AnalysisOptions extends AIOperationOptions {
  includeSentiment?: boolean;
  includeConfidence?: boolean;
}

export interface CoachingOptions extends AIOperationOptions {
  dealStage?: string;
  methodology?: string;
  useAllMeetingsContext?: boolean;
  journeyContext?: string;
}

export interface ChatOptions extends AIOperationOptions {
  conversationHistory?: Array<{ role: string; content: string }>;
  meetingContext?: string;
  journeyContext?: string;
  isExtendedResponse?: boolean;
}

export interface TranscriptionOptions extends AIOperationOptions {
  language?: string;
  responseFormat?: 'text' | 'json';
  prompt?: string;
}

// Methodology insights specific types
export interface MethodologyInsight {
  insight: string;
  description: string;
  clientSpecific: string;
  actionableSteps: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface MethodologyInsightsResult {
  methodology: string;
  contextualInsights: MethodologyInsight[];
  strategicRecommendations: {
    immediate: string[];
    nearTerm: string[];
    longTerm: string[];
  };
  riskFactors: string[];
  successIndicators: string[];
}

// Main AI Provider interface
export interface AIProvider {
  // Core analysis methods
  analyzeNotes(content: string, options?: AnalysisOptions): Promise<AIAnalysisResult>;
  
  generateCoachingSuggestions(
    content: string, 
    dealStage: string, 
    options?: CoachingOptions
  ): Promise<CoachingSuggestionContent>;
  
  generateChatResponse(
    message: string, 
    options?: ChatOptions
  ): Promise<string>;
  
  generateMethodologyInsights(
    methodology: string,
    clientInfo: any,
    notesContent: string,
    meeting: any,
    options?: AIOperationOptions
  ): Promise<MethodologyInsightsResult>;
  
  generateFollowUpQuestions(
    notesContent: string,
    painPoints: string[],
    options?: AIOperationOptions
  ): Promise<string[]>;

  generateMeetingSummary(
    notesContent: string,
    dealStage: string,
    options?: AIOperationOptions
  ): Promise<any>;
  
  // Transcription method
  transcribeAudio(
    audioBuffer: Buffer,
    options?: TranscriptionOptions
  ): Promise<string>;
}

// Error types for AI operations
export class AIProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly operation: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}

export class AIProviderRateLimitError extends AIProviderError {
  constructor(provider: string, operation: string, retryAfter?: number) {
    super(`Rate limit exceeded${retryAfter ? `, retry after ${retryAfter}s` : ''}`, provider, operation);
    this.name = 'AIProviderRateLimitError';
  }
}