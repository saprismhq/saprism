import { ICacheService, CacheEntry, CacheOptions } from './ICacheService.js';
import { getLogger } from '../../utils/LoggerFactory.js';
import winston from 'winston';
import crypto from 'crypto';

/**
 * In-memory implementation of the cache service
 * Suitable for single-instance deployments
 */
export class InMemoryCacheService implements ICacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private logger: winston.Logger;
  private cleanupTimer?: NodeJS.Timer;
  private readonly options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.logger = getLogger('InMemoryCacheService');
    
    this.options = {
      defaultTTL: options.defaultTTL ?? 300, // 5 minutes default
      maxSize: options.maxSize ?? 1000,
      cleanupInterval: options.cleanupInterval ?? 60, // Cleanup every minute
      namespace: options.namespace ?? 'default'
    };

    this.startCleanupTimer();
    this.logger.info('InMemoryCacheService initialized', { 
      options: this.options 
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key);
    const entry = this.cache.get(fullKey);

    if (!entry) {
      this.logger.debug('Cache miss', { key: fullKey });
      return null;
    }

    // Check if expired
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.logger.debug('Cache entry expired', { key: fullKey });
      this.cache.delete(fullKey);
      return null;
    }

    // Update hit count
    entry.hits = (entry.hits || 0) + 1;
    
    this.logger.debug('Cache hit', { 
      key: fullKey, 
      hits: entry.hits,
      age: Date.now() - entry.createdAt 
    });

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const fullKey = this.getFullKey(key);
    const effectiveTTL = ttl ?? this.options.defaultTTL;

    // Check size limit
    if (this.cache.size >= this.options.maxSize) {
      await this.evictOldest();
    }

    const entry: CacheEntry<T> = {
      value,
      createdAt: Date.now(),
      hits: 0
    };

    if (effectiveTTL > 0) {
      entry.expiresAt = Date.now() + (effectiveTTL * 1000);
    }

    this.cache.set(fullKey, entry);
    
    this.logger.debug('Cache set', { 
      key: fullKey, 
      ttl: effectiveTTL,
      size: this.cache.size 
    });
  }

  async delete(key: string): Promise<void> {
    const fullKey = this.getFullKey(key);
    const deleted = this.cache.delete(fullKey);
    
    if (deleted) {
      this.logger.debug('Cache entry deleted', { key: fullKey });
    }
  }

  async clear(pattern?: string): Promise<void> {
    if (!pattern) {
      const size = this.cache.size;
      this.cache.clear();
      this.logger.info('Cache cleared', { entriesDeleted: size });
      return;
    }

    // Pattern matching
    const regex = this.patternToRegex(pattern);
    let deletedCount = 0;

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    this.logger.info('Cache pattern cleared', { 
      pattern, 
      entriesDeleted: deletedCount 
    });
  }

  async has(key: string): Promise<boolean> {
    const fullKey = this.getFullKey(key);
    const entry = this.cache.get(fullKey);

    if (!entry) return false;

    // Check expiration
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.cache.delete(fullKey);
      return false;
    }

    return true;
  }

  async ttl(key: string): Promise<number> {
    const fullKey = this.getFullKey(key);
    const entry = this.cache.get(fullKey);

    if (!entry || !entry.expiresAt) return -1;

    const remaining = Math.max(0, entry.expiresAt - Date.now());
    return Math.floor(remaining / 1000); // Return in seconds
  }

  /**
   * Generate a cache key based on content hash
   */
  static generateKey(prefix: string, params: any[]): string {
    const hash = crypto.createHash('md5')
      .update(JSON.stringify(params))
      .digest('hex')
      .substring(0, 8);
    return `${prefix}:${hash}`;
  }

  /**
   * Private helper methods
   */

  private getFullKey(key: string): string {
    return this.options.namespace === 'default' 
      ? key 
      : `${this.options.namespace}:${key}`;
  }

  private patternToRegex(pattern: string): RegExp {
    // Convert wildcard pattern to regex
    const escaped = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    return new RegExp(`^${escaped}$`);
  }

  private async evictOldest(): Promise<void> {
    // Find the oldest entry with least hits
    let oldestKey: string | null = null;
    let oldestScore = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      // Score based on age and hits (LFU + LRU hybrid)
      const age = Date.now() - entry.createdAt;
      const score = (entry.hits || 0) - (age / 1000);

      if (score < oldestScore) {
        oldestScore = score;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.logger.debug('Evicted cache entry', { key: oldestKey });
    }
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.options.cleanupInterval * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt && entry.expiresAt <= now) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.debug('Cleaned expired entries', { count: cleaned });
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.cache.clear();
    this.logger.info('Cache service destroyed');
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; hits: number; misses: number } {
    let totalHits = 0;
    for (const entry of this.cache.values()) {
      totalHits += entry.hits || 0;
    }

    return {
      size: this.cache.size,
      hits: totalHits,
      misses: 0 // Would need to track separately
    };
  }
}