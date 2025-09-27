// Resilience Decorator - implements circuit breaker, retry, and failover patterns

import type { 
  AIProvider, 
  AnalysisOptions, 
  CoachingOptions, 
  ChatOptions, 
  TranscriptionOptions,
  MethodologyInsightsResult,
  AIProviderError,
  AIProviderTimeoutError,
  AIProviderRateLimitError,
  AIProviderQuotaError
} from '../interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../../shared/schema';
import type { ResilienceConfig } from '../../../config/index';

// Circuit breaker states
enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

// Circuit breaker tracking
interface CircuitBreakerStatus {
  state: CircuitBreakerState;
  failureCount: number;
  lastFailureTime: number;
  nextAttemptTime: number;
}

// Retry configuration for specific operations
interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  multiplier: number;
  jitterMs?: number;
}

export class ResilienceDecorator implements AIProvider {
  private circuitBreakers = new Map<string, CircuitBreakerStatus>();
  private config: ResilienceConfig;

  constructor(
    private provider: AIProvider,
    config: ResilienceConfig
  ) {
    this.config = config;
  }

  private getCircuitBreakerKey(operation: string): string {
    return `circuit-breaker-${operation}`;
  }

  private getCircuitBreakerStatus(operation: string): CircuitBreakerStatus {
    const key = this.getCircuitBreakerKey(operation);
    return this.circuitBreakers.get(key) || {
      state: CircuitBreakerState.CLOSED,
      failureCount: 0,
      lastFailureTime: 0,
      nextAttemptTime: 0
    };
  }

  private updateCircuitBreakerStatus(operation: string, status: CircuitBreakerStatus): void {
    const key = this.getCircuitBreakerKey(operation);
    this.circuitBreakers.set(key, status);
  }

  private isCircuitBreakerOpen(operation: string): boolean {
    const status = this.getCircuitBreakerStatus(operation);
    const now = Date.now();

    switch (status.state) {
      case CircuitBreakerState.CLOSED:
        return false;
      
      case CircuitBreakerState.OPEN:
        if (now >= status.nextAttemptTime) {
          // Transition to half-open
          status.state = CircuitBreakerState.HALF_OPEN;
          this.updateCircuitBreakerStatus(operation, status);
          return false;
        }
        return true;
      
      case CircuitBreakerState.HALF_OPEN:
        return false;
      
      default:
        return false;
    }
  }

  private recordSuccess(operation: string): void {
    const status = this.getCircuitBreakerStatus(operation);
    status.state = CircuitBreakerState.CLOSED;
    status.failureCount = 0;
    status.lastFailureTime = 0;
    status.nextAttemptTime = 0;
    this.updateCircuitBreakerStatus(operation, status);
  }

  private recordFailure(operation: string): void {
    const status = this.getCircuitBreakerStatus(operation);
    const now = Date.now();
    
    status.failureCount++;
    status.lastFailureTime = now;

    if (status.failureCount >= this.config.circuitBreakerThreshold) {
      status.state = CircuitBreakerState.OPEN;
      status.nextAttemptTime = now + this.config.circuitBreakerTimeout;
      console.warn(`Circuit breaker opened for operation: ${operation}`);
    }

    this.updateCircuitBreakerStatus(operation, status);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateRetryDelay(attempt: number, options: RetryOptions): number {
    const baseDelay = options.baseDelayMs * Math.pow(options.multiplier, attempt);
    const jitter = options.jitterMs ? Math.random() * options.jitterMs : 0;
    return Math.min(baseDelay + jitter, options.maxDelayMs);
  }

  private isRetriableError(error: any): boolean {
    // Retry on network errors, timeouts, and rate limits
    const errorMessage = error?.message?.toLowerCase() || '';
    const errorCode = error?.code || '';
    const statusCode = error?.status || error?.statusCode || 0;
    
    return (
      errorMessage.includes('timeout') ||
      errorMessage.includes('network') ||
      errorMessage.includes('econnreset') ||
      errorMessage.includes('enotfound') ||
      errorCode === 'ECONNRESET' ||
      errorCode === 'ENOTFOUND' ||
      errorCode === 'ETIMEDOUT' ||
      [429, 502, 503, 504].includes(statusCode)
    );
  }

  private async executeWithResilience<T>(
    operation: string,
    operationFn: () => Promise<T>,
    retryOptions?: Partial<RetryOptions>
  ): Promise<T> {
    // Check circuit breaker
    if (this.isCircuitBreakerOpen(operation)) {
      throw new Error(
        `Circuit breaker is open for operation: ${operation}`
      );
    }

    const retry: RetryOptions = {
      maxAttempts: this.config.retryAttempts,
      baseDelayMs: 1000,
      maxDelayMs: this.config.maxBackoffMs,
      multiplier: this.config.backoffMultiplier,
      jitterMs: 100,
      ...retryOptions
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retry.maxAttempts; attempt++) {
      try {
        const result = await operationFn();
        this.recordSuccess(operation);
        return result;
      } catch (error) {
        lastError = error as Error;
        
        // Record failure for circuit breaker
        this.recordFailure(operation);

        // Don't retry on certain errors
        if (!this.isRetriableError(error)) {
          throw error;
        }

        // Don't retry on final attempt
        if (attempt >= retry.maxAttempts) {
          break;
        }

        // Calculate and apply retry delay
        const delay = this.calculateRetryDelay(attempt, retry);
        console.warn(`Operation ${operation} failed (attempt ${attempt + 1}), retrying in ${delay}ms:`, error);
        await this.sleep(delay);
      }
    }

    throw lastError || new Error(
      `Operation failed after ${retry.maxAttempts} attempts`
    );
  }

  async analyzeNotes(content: string, options?: AnalysisOptions): Promise<AIAnalysisResult> {
    return this.executeWithResilience(
      'analyzeNotes',
      () => this.provider.analyzeNotes(content, options),
      { baseDelayMs: 2000 } // Longer delay for analysis operations
    );
  }

  async generateCoachingSuggestions(
    content: string, 
    dealStage: string, 
    options?: CoachingOptions
  ): Promise<CoachingSuggestionContent> {
    return this.executeWithResilience(
      'generateCoachingSuggestions',
      () => this.provider.generateCoachingSuggestions(content, dealStage, options),
      { baseDelayMs: 2000 }
    );
  }

  async generateChatResponse(message: string, options?: ChatOptions): Promise<string> {
    return this.executeWithResilience(
      'generateChatResponse',
      () => this.provider.generateChatResponse(message, options),
      { baseDelayMs: 500, maxDelayMs: 3000 } // Faster retry for chat
    );
  }

  async generateMethodologyInsights(
    methodology: string,
    clientInfo: any,
    notesContent: string,
    meeting: any,
    options?: any
  ): Promise<MethodologyInsightsResult> {
    return this.executeWithResilience(
      'generateMethodologyInsights',
      () => this.provider.generateMethodologyInsights(methodology, clientInfo, notesContent, meeting, options),
      { baseDelayMs: 3000, maxDelayMs: 15000 } // Longer delays for complex operations
    );
  }

  async generateFollowUpQuestions(
    notesContent: string,
    painPoints: string[],
    options?: any
  ): Promise<string[]> {
    return this.executeWithResilience(
      'generateFollowUpQuestions',
      () => this.provider.generateFollowUpQuestions(notesContent, painPoints, options),
      { baseDelayMs: 1500 }
    );
  }

  async transcribeAudio(audioBuffer: Buffer, options?: TranscriptionOptions): Promise<string> {
    return this.executeWithResilience(
      'transcribeAudio',
      () => this.provider.transcribeAudio(audioBuffer, options),
      { 
        baseDelayMs: 1000, 
        maxDelayMs: 5000,
        maxAttempts: 2 // Less aggressive retry for audio
      }
    );
  }

  // Health check method
  getCircuitBreakerStatus(): Record<string, CircuitBreakerStatus> {
    const status: Record<string, CircuitBreakerStatus> = {};
    for (const [key, value] of this.circuitBreakers.entries()) {
      const operationName = key.replace('circuit-breaker-', '');
      status[operationName] = { ...value };
    }
    return status;
  }

  // Manual circuit breaker reset
  resetCircuitBreaker(operation?: string): void {
    if (operation) {
      const key = this.getCircuitBreakerKey(operation);
      this.circuitBreakers.delete(key);
      console.log(`Circuit breaker reset for operation: ${operation}`);
    } else {
      this.circuitBreakers.clear();
      console.log('All circuit breakers reset');
    }
  }
}