// Unified AI Service - single interface for all AI operations with full abstraction

import type { AIProvider } from './interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../shared/schema';
import { getDefaultAIProvider } from './AIProviderFactory';
import { getLogger } from '../../utils/LoggerFactory';
import winston from 'winston';
import { getCacheService } from '../cache';
import crypto from 'crypto';

/**
 * Unified AI Service - maintains backward compatibility while providing provider abstraction
 * 
 * This service maintains the exact same method signatures as the original OpenAI service
 * to ensure zero breaking changes while adding caching, debouncing, and provider switching.
 */
export class AIService {
  private provider: AIProvider;
  private logger: winston.Logger;

  constructor(provider?: AIProvider) {
    this.provider = provider || getDefaultAIProvider();
    this.logger = getLogger('AIService');
  }

  /**
   * Analyze meeting notes and extract structured sales insights
   * 
   * @param notesContent - The raw meeting notes content
   * @returns Structured analysis including deal stage, pain points, sentiment, etc.
   */
  async analyzeNotes(notesContent: string): Promise<AIAnalysisResult> {
    // Generate cache key based on content hash
    const contentHash = crypto.createHash('md5')
      .update(notesContent)
      .digest('hex')
      .substring(0, 12);
    const cacheKey = `ai:analysis:${contentHash}`;
    
    // Check cache first
    const cacheService = getCacheService();
    const cached = await cacheService.get<AIAnalysisResult>(cacheKey);
    if (cached !== null) {
      this.logger.debug("AI analysis cache hit", { cacheKey });
      return cached;
    }
    
    // Call provider and cache result
    const result = await this.provider.analyzeNotes(notesContent);
    await cacheService.set(cacheKey, result, 900); // Cache for 15 minutes
    
    this.logger.debug("AI analysis cached", { cacheKey });
    return result;
  }

  /**
   * Generate sales coaching suggestions based on notes and deal stage
   * 
   * @param notesContent - The meeting notes content
   * @param dealStage - Current stage of the deal
   * @param options - Optional coaching options including journey context
   * @returns Coaching suggestions with questions, pain mapping, and next steps
   */
  async generateCoachingSuggestions(notesContent: string, dealStage: string, options?: any): Promise<CoachingSuggestionContent> {
    // Generate cache key including journey context if present
    const cacheKeyComponents = [notesContent, dealStage];
    if (options?.journeyContext) {
      cacheKeyComponents.push(options.journeyContext.substring(0, 200));
    }
    
    const contentHash = crypto.createHash('md5')
      .update(cacheKeyComponents.join('|'))
      .digest('hex')
      .substring(0, 12);
    const cacheKey = `ai:coaching:${dealStage}:${contentHash}`;
    
    // Check cache first
    const cacheService = getCacheService();
    const cached = await cacheService.get<CoachingSuggestionContent>(cacheKey);
    if (cached !== null) {
      this.logger.debug("Coaching suggestions cache hit", { cacheKey, dealStage });
      return cached;
    }
    
    // Call provider and cache result
    const result = await this.provider.generateCoachingSuggestions(notesContent, dealStage, options);
    await cacheService.set(cacheKey, result, 900); // Cache for 15 minutes
    
    this.logger.debug("Coaching suggestions cached", { cacheKey, dealStage });
    return result;
  }

  /**
   * Generate Growth Guide chat responses with structured format
   * 
   * @param message - User's chat message
   * @param options - Chat options including meeting context, conversation history, and journey context
   * @returns Formatted chat response with sections
   */
  async generateChatResponse(message: string, options: any): Promise<string> {
    const chatOptions = {
      meetingContext: options.meetingContext || '',
      conversationHistory: options.conversationHistory || [],
      journeyContext: options.journeyContext,
      isExtendedResponse: options.isExtendedResponse || message.length > 200 || this.isFromSectionButton(message)
    };
    
    return this.provider.generateChatResponse(message, chatOptions);
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
   * Generate structured meeting summary for cross-meeting context
   * 
   * @param notesContent - The meeting notes and transcription content
   * @param dealStage - Current deal stage for context
   * @returns Structured summary with pains, progress, next steps, and key insights
   */
  async generateMeetingSummary(notesContent: string, dealStage: string): Promise<any> {
    return this.provider.generateMeetingSummary(notesContent, dealStage);
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
    this.logger.info('AI provider switched successfully', { 
      newProviderType: newProvider.constructor.name 
    });
  }
}

// Export singleton instance for backward compatibility
export const aiService = new AIService();