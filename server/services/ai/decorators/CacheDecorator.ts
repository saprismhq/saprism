// Cache Decorator - implements caching strategy pattern for AI operations

import type { 
  AIProvider, 
  AnalysisOptions, 
  CoachingOptions, 
  ChatOptions, 
  TranscriptionOptions,
  MethodologyInsightsResult 
} from '../interfaces/AIProvider';
import type { AIAnalysisResult, CoachingSuggestionContent } from '../../../../shared/schema';
import type { CacheConfig } from '../../../config/index';

// Cache strategy interface
export interface CacheStrategy {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

// Memory cache implementation
export class MemoryCacheStrategy implements CacheStrategy {
  private cache = new Map<string, { value: any; expires: number }>();
  private maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      value,
      expires: Date.now() + (ttlSeconds * 1000)
    });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async has(key: string): Promise<boolean> {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

// Redis cache implementation (for future use)
export class RedisCacheStrategy implements CacheStrategy {
  // TODO: Implement Redis cache strategy when Redis is available
  async get<T>(key: string): Promise<T | null> {
    console.log('Redis cache not implemented yet, falling back to memory');
    return null;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    // No-op for now
  }

  async delete(key: string): Promise<void> {
    // No-op for now
  }

  async clear(): Promise<void> {
    // No-op for now
  }

  async has(key: string): Promise<boolean> {
    return false;
  }
}

// Hybrid cache strategy (memory + Redis)
export class HybridCacheStrategy implements CacheStrategy {
  private memoryCache: MemoryCacheStrategy;
  private redisCache: RedisCacheStrategy;

  constructor(maxMemorySize: number = 100) {
    this.memoryCache = new MemoryCacheStrategy(maxMemorySize);
    this.redisCache = new RedisCacheStrategy();
  }

  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryResult = await this.memoryCache.get<T>(key);
    if (memoryResult !== null) {
      return memoryResult;
    }

    // Fallback to Redis
    const redisResult = await this.redisCache.get<T>(key);
    if (redisResult !== null) {
      // Populate memory cache
      await this.memoryCache.set(key, redisResult, 300); // 5 min memory cache
    }

    return redisResult;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    // Set in both caches
    await Promise.all([
      this.memoryCache.set(key, value, Math.min(ttlSeconds, 300)), // Max 5 min in memory
      this.redisCache.set(key, value, ttlSeconds)
    ]);
  }

  async delete(key: string): Promise<void> {
    await Promise.all([
      this.memoryCache.delete(key),
      this.redisCache.delete(key)
    ]);
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.memoryCache.clear(),
      this.redisCache.clear()
    ]);
  }

  async has(key: string): Promise<boolean> {
    const hasInMemory = await this.memoryCache.has(key);
    if (hasInMemory) return true;
    
    return await this.redisCache.has(key);
  }
}

// Cache decorator implementation
export class CacheDecorator implements AIProvider {
  private cache: CacheStrategy;
  private config: CacheConfig;

  constructor(
    private provider: AIProvider,
    cacheStrategy: CacheStrategy | null,
    config: CacheConfig
  ) {
    this.config = config;
    
    // Initialize cache strategy based on config
    if (!config.enabled || !cacheStrategy) {
      // Null object pattern - no-op cache
      this.cache = new MemoryCacheStrategy(0);
    } else {
      this.cache = cacheStrategy;
    }
  }

  private generateCacheKey(operation: string, ...params: any[]): string {
    const paramHash = this.hashParams(params);
    return `ai:${operation}:${paramHash}`;
  }

  private hashParams(params: any[]): string {
    const content = JSON.stringify(params);
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  async analyzeNotes(content: string, options?: AnalysisOptions): Promise<AIAnalysisResult> {
    if (!this.config.enabled) {
      return this.provider.analyzeNotes(content, options);
    }

    const cacheKey = this.generateCacheKey('analysis', content, options);
    
    // Try cache first
    const cached = await this.cache.get<AIAnalysisResult>(cacheKey);
    if (cached) {
      console.log(`Cache hit for analysis: ${cacheKey}`);
      return cached;
    }

    // Cache miss - call provider
    console.log(`Cache miss for analysis: ${cacheKey}`);
    const result = await this.provider.analyzeNotes(content, options);
    
    // Store in cache
    await this.cache.set(cacheKey, result, this.config.ttl.analysis);
    
    return result;
  }

  async generateCoachingSuggestions(
    content: string, 
    dealStage: string, 
    options?: CoachingOptions
  ): Promise<CoachingSuggestionContent> {
    if (!this.config.enabled) {
      return this.provider.generateCoachingSuggestions(content, dealStage, options);
    }

    const cacheKey = this.generateCacheKey('coaching', content, dealStage, options);
    
    const cached = await this.cache.get<CoachingSuggestionContent>(cacheKey);
    if (cached) {
      console.log(`Cache hit for coaching: ${cacheKey}`);
      return cached;
    }

    console.log(`Cache miss for coaching: ${cacheKey}`);
    const result = await this.provider.generateCoachingSuggestions(content, dealStage, options);
    
    await this.cache.set(cacheKey, result, this.config.ttl.coaching);
    
    return result;
  }

  async generateChatResponse(message: string, options?: ChatOptions): Promise<string> {
    if (!this.config.enabled) {
      return this.provider.generateChatResponse(message, options);
    }

    const cacheKey = this.generateCacheKey('chat', message, options);
    
    const cached = await this.cache.get<string>(cacheKey);
    if (cached) {
      console.log(`Cache hit for chat: ${cacheKey}`);
      return cached;
    }

    console.log(`Cache miss for chat: ${cacheKey}`);
    const result = await this.provider.generateChatResponse(message, options);
    
    await this.cache.set(cacheKey, result, this.config.ttl.chat);
    
    return result;
  }

  async generateMethodologyInsights(
    methodology: string,
    clientInfo: any,
    notesContent: string,
    meeting: any,
    options?: any
  ): Promise<MethodologyInsightsResult> {
    if (!this.config.enabled) {
      return this.provider.generateMethodologyInsights(methodology, clientInfo, notesContent, meeting, options);
    }

    const cacheKey = this.generateCacheKey('methodology', methodology, clientInfo, notesContent, meeting, options);
    
    const cached = await this.cache.get<MethodologyInsightsResult>(cacheKey);
    if (cached) {
      console.log(`Cache hit for methodology: ${cacheKey}`);
      return cached;
    }

    console.log(`Cache miss for methodology: ${cacheKey}`);
    const result = await this.provider.generateMethodologyInsights(methodology, clientInfo, notesContent, meeting, options);
    
    await this.cache.set(cacheKey, result, this.config.ttl.methodology);
    
    return result;
  }

  async generateFollowUpQuestions(
    notesContent: string,
    painPoints: string[],
    options?: any
  ): Promise<string[]> {
    if (!this.config.enabled) {
      return this.provider.generateFollowUpQuestions(notesContent, painPoints, options);
    }

    const cacheKey = this.generateCacheKey('followup', notesContent, painPoints, options);
    
    const cached = await this.cache.get<string[]>(cacheKey);
    if (cached) {
      console.log(`Cache hit for follow-up: ${cacheKey}`);
      return cached;
    }

    console.log(`Cache miss for follow-up: ${cacheKey}`);
    const result = await this.provider.generateFollowUpQuestions(notesContent, painPoints, options);
    
    await this.cache.set(cacheKey, result, this.config.ttl.followUp);
    
    return result;
  }

  async transcribeAudio(audioBuffer: Buffer, options?: TranscriptionOptions): Promise<string> {
    // Don't cache audio transcription as it's typically unique
    return this.provider.transcribeAudio(audioBuffer, options);
  }
}