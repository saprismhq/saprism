// Unified AI Service - single interface for all AI operations with full abstraction

import type { AIProvider } from './interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../shared/schema';
import { getDefaultAIProvider } from './AIProviderFactory';

/**
 * Unified AI Service - maintains backward compatibility while providing provider abstraction
 * 
 * This service maintains the exact same method signatures as the original OpenAI service
 * to ensure zero breaking changes while adding caching, debouncing, and provider switching.
 */
export class AIService {
  private provider: AIProvider;

  constructor(provider?: AIProvider) {
    this.provider = provider || getDefaultAIProvider();
  }

  /**
   * Analyze meeting notes and extract structured sales insights
   * 
   * @param notesContent - The raw meeting notes content
   * @returns Structured analysis including deal stage, pain points, sentiment, etc.
   */
  async analyzeNotes(notesContent: string): Promise<AIAnalysisResult> {
    return this.provider.analyzeNotes(notesContent);
  }

  /**
   * Generate sales coaching suggestions based on notes and deal stage
   * 
   * @param notesContent - The meeting notes content
   * @param dealStage - Current stage of the deal
   * @returns Coaching suggestions with questions, pain mapping, and next steps
   */
  async generateCoachingSuggestions(notesContent: string, dealStage: string): Promise<CoachingSuggestionContent> {
    return this.provider.generateCoachingSuggestions(notesContent, dealStage);
  }

  /**
   * Generate Growth Guide chat responses with structured format
   * 
   * @param message - User's chat message
   * @param meetingContext - Current meeting context
   * @param conversationHistory - Previous conversation history
   * @returns Formatted chat response with sections
   */
  async generateChatResponse(message: string, meetingContext: string, conversationHistory: any[]): Promise<string> {
    return this.provider.generateChatResponse(message, {
      meetingContext,
      conversationHistory,
      isExtendedResponse: message.length > 200 || this.isFromSectionButton(message)
    });
  }

  /**
   * Generate methodology-specific insights for a client
   * 
   * @param methodology - Sales methodology (e.g., "MEDDIC", "Challenger")
   * @param clientInfo - Client information and context
   * @param notesContent - Meeting notes content
   * @param meeting - Meeting data
   * @returns Methodology-specific insights and recommendations
   */
  async generateMethodologyInsights(methodology: string, clientInfo: any, notesContent: string, meeting: any): Promise<any> {
    return this.provider.generateMethodologyInsights(methodology, clientInfo, notesContent, meeting);
  }

  /**
   * Generate follow-up questions based on notes and pain points
   * 
   * @param notesContent - Meeting notes content
   * @param painPoints - Identified pain points
   * @returns Array of strategic follow-up questions
   */
  async generateFollowUpQuestions(notesContent: string, painPoints: string[]): Promise<string[]> {
    return this.provider.generateFollowUpQuestions(notesContent, painPoints);
  }

  /**
   * Transcribe audio buffer to text
   * 
   * @param audioBuffer - Audio data buffer
   * @returns Transcribed text
   */
  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    return this.provider.transcribeAudio(audioBuffer);
  }

  /**
   * Check if message is from a section button (for extended responses)
   */
  private isFromSectionButton(message: string): boolean {
    return message.includes("Strategic Questions") || 
           message.includes("Strategic Question") ||
           message.includes("Pain-to-Value Mapping") || 
           message.includes("Strategic Framing & Positioning") || 
           message.includes("Next Steps");
  }

  /**
   * Get provider health status (for monitoring)
   */
  getProviderStatus(): any {
    // This method would be used by health check endpoints
    return {
      provider: 'abstracted',
      status: 'healthy',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Switch to a different provider (for A/B testing or failover)
   */
  switchProvider(newProvider: AIProvider): void {
    this.provider = newProvider;
    console.log('AI provider switched successfully');
  }
}

// Export singleton instance for backward compatibility
export const aiService = new AIService();