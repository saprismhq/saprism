// Debounce Decorator - implements debouncing for AI operations to prevent rate limiting

import type { 
  AIProvider, 
  AnalysisOptions, 
  CoachingOptions, 
  ChatOptions, 
  TranscriptionOptions,
  MethodologyInsightsResult 
} from '../interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../../shared/schema';
import type { DebounceConfig } from '../../../config/index';
import { getLogger } from '../../../utils/LoggerFactory';
import winston from 'winston';

// Debounced operation tracking
interface DebounceState {
  timeoutId: NodeJS.Timeout | null;
  lastArgs: any[];
  pendingPromise: Promise<any> | null;
  resolve: ((value: any) => void) | null;
  reject: ((error: any) => void) | null;
}

export class DebounceDecorator implements AIProvider {
  private debounceStates = new Map<string, DebounceState>();
  private config: DebounceConfig;
  private logger: winston.Logger;

  constructor(
    private provider: AIProvider,
    config: DebounceConfig
  ) {
    this.config = config;
    this.logger = getLogger('DebounceDecorator');
  }

  private async debounceOperation<T>(
    operationKey: string,
    delayMs: number,
    operation: () => Promise<T>,
    args: any[]
  ): Promise<T> {
    // If no debouncing configured, execute immediately
    if (delayMs <= 0) {
      return operation();
    }

    return new Promise<T>((resolve, reject) => {
      const state = this.debounceStates.get(operationKey) || {
        timeoutId: null,
        lastArgs: [],
        pendingPromise: null,
        resolve: null,
        reject: null
      };

      // Clear existing timeout
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      // Check if content has changed significantly
      const contentChanged = this.hasContentChanged(state.lastArgs, args);
      
      if (!contentChanged && state.pendingPromise) {
        // Content hasn't changed, return existing promise
        state.pendingPromise.then(resolve).catch(reject);
        return;
      }

      // Update state
      state.lastArgs = [...args];
      state.resolve = resolve;
      state.reject = reject;

      // Set new timeout
      state.timeoutId = setTimeout(async () => {
        try {
          this.logger.debug("Executing debounced operation", { operationKey });
          const result = await operation();
          state.resolve?.(result);
          this.debounceStates.delete(operationKey);
        } catch (error) {
          state.reject?.(error);
          this.debounceStates.delete(operationKey);
        }
      }, delayMs);

      this.debounceStates.set(operationKey, state);
    });
  }

  private hasContentChanged(oldArgs: any[], newArgs: any[]): boolean {
    if (oldArgs.length !== newArgs.length) return true;
    
    // Simple content comparison - could be enhanced with similarity checking
    const oldContent = JSON.stringify(oldArgs);
    const newContent = JSON.stringify(newArgs);
    
    // If content is very similar (>95% match), consider it unchanged
    const similarity = this.calculateSimilarity(oldContent, newContent);
    return similarity < 0.95;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (str1.length === 0 || str2.length === 0) return 0;

    const maxLength = Math.max(str1.length, str2.length);
    const editDistance = this.levenshteinDistance(str1, str2);
    
    return 1 - (editDistance / maxLength);
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  async analyzeNotes(content: string, options?: AnalysisOptions): Promise<AIAnalysisResult> {
    const operationKey = `analyzeNotes-${this.hashContent(content)}`;
    
    return this.debounceOperation(
      operationKey,
      this.config.noteAnalysis,
      () => this.provider.analyzeNotes(content, options),
      [content, options]
    );
  }

  async generateCoachingSuggestions(
    content: string, 
    dealStage: string, 
    options?: CoachingOptions
  ): Promise<CoachingSuggestionContent> {
    const operationKey = `generateCoaching-${this.hashContent(content)}-${dealStage}`;
    
    return this.debounceOperation(
      operationKey,
      this.config.coachingSuggestions,
      () => this.provider.generateCoachingSuggestions(content, dealStage, options),
      [content, dealStage, options]
    );
  }

  async generateChatResponse(message: string, options?: ChatOptions): Promise<string> {
    const operationKey = `generateChat-${this.hashContent(message)}`;
    
    return this.debounceOperation(
      operationKey,
      this.config.chatResponses,
      () => this.provider.generateChatResponse(message, options),
      [message, options]
    );
  }

  async generateMethodologyInsights(
    methodology: string,
    clientInfo: any,
    notesContent: string,
    meeting: any,
    options?: any
  ): Promise<MethodologyInsightsResult> {
    const operationKey = `generateMethodology-${methodology}-${this.hashContent(notesContent)}`;
    
    return this.debounceOperation(
      operationKey,
      this.config.methodologyInsights,
      () => this.provider.generateMethodologyInsights(methodology, clientInfo, notesContent, meeting, options),
      [methodology, clientInfo, notesContent, meeting, options]
    );
  }

  async generateFollowUpQuestions(
    notesContent: string,
    painPoints: string[],
    options?: any
  ): Promise<string[]> {
    const operationKey = `generateFollowUp-${this.hashContent(notesContent)}`;
    
    return this.debounceOperation(
      operationKey,
      this.config.followUpQuestions,
      () => this.provider.generateFollowUpQuestions(notesContent, painPoints, options),
      [notesContent, painPoints, options]
    );
  }

  async transcribeAudio(audioBuffer: Buffer, options?: TranscriptionOptions): Promise<string> {
    // Don't debounce audio transcription as each audio chunk is unique and time-sensitive
    return this.provider.transcribeAudio(audioBuffer, options);
  }

  private hashContent(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  // Cleanup method to clear any pending debounced operations
  clearPendingOperations(): void {
    for (const [key, state] of this.debounceStates.entries()) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      if (state.reject) {
        state.reject(new Error('Operation cancelled due to shutdown'));
      }
    }
    this.debounceStates.clear();
  }
}