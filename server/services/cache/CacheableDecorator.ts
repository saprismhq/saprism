import { ICacheService } from './ICacheService';
import { InMemoryCacheService } from './InMemoryCacheService';
import { getLogger } from '../../utils/LoggerFactory';
import winston from 'winston';

/**
 * Decorator options for caching methods
 */
export interface CacheableOptions {
  ttl?: number; // Time to live in seconds
  keyPrefix?: string; // Key prefix for this method
  keyGenerator?: (...args: any[]) => string; // Custom key generator
  condition?: (...args: any[]) => boolean; // Conditional caching
  invalidateOn?: string[]; // Events that invalidate this cache
}

/**
 * Global cache service instance
 */
let globalCacheService: ICacheService | null = null;

/**
 * Initialize the global cache service
 */
export function initializeCacheService(service?: ICacheService): void {
  if (!service) {
    service = new InMemoryCacheService({
      defaultTTL: 300, // 5 minutes
      maxSize: 1000,
      cleanupInterval: 60
    });
  }
  globalCacheService = service;
}

/**
 * Get the global cache service
 */
export function getCacheService(): ICacheService {
  if (!globalCacheService) {
    initializeCacheService();
  }
  return globalCacheService!;
}

/**
 * Cacheable decorator for methods
 * Usage: @Cacheable({ ttl: 300, keyPrefix: 'journey' })
 */
export function Cacheable(options: CacheableOptions = {}) {
  const logger = getLogger('CacheableDecorator');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const methodName = `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      // Check if caching is enabled
      const cacheService = getCacheService();
      
      // Check condition if provided
      if (options.condition && !options.condition(...args)) {
        logger.debug('Cache condition not met', { method: methodName });
        return originalMethod.apply(this, args);
      }

      // Generate cache key
      const keyPrefix = options.keyPrefix || methodName;
      const cacheKey = options.keyGenerator
        ? options.keyGenerator(...args)
        : InMemoryCacheService.generateKey(keyPrefix, args);

      try {
        // Try to get from cache
        const cached = await cacheService.get(cacheKey);
        if (cached !== null) {
          logger.debug('Cache hit for method', { 
            method: methodName, 
            key: cacheKey 
          });
          return cached;
        }

        // Execute original method
        logger.debug('Cache miss, executing method', { 
          method: methodName, 
          key: cacheKey 
        });
        const result = await originalMethod.apply(this, args);

        // Store in cache if result is not null/undefined
        if (result !== null && result !== undefined) {
          await cacheService.set(cacheKey, result, options.ttl);
          logger.debug('Result cached', { 
            method: methodName, 
            key: cacheKey,
            ttl: options.ttl 
          });
        }

        return result;
      } catch (error) {
        logger.error('Error in cached method', {
          method: methodName,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        // On error, still execute the original method
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

/**
 * CacheInvalidate decorator to invalidate cache entries
 * Usage: @CacheInvalidate({ patterns: ['journey:*', 'coaching:*'] })
 */
export function CacheInvalidate(options: { patterns: string[] }) {
  const logger = getLogger('CacheInvalidateDecorator');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const methodName = `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      const cacheService = getCacheService();
      
      try {
        // Execute original method first
        const result = await originalMethod.apply(this, args);

        // Invalidate cache patterns after successful execution
        for (const pattern of options.patterns) {
          await cacheService.clear(pattern);
          logger.debug('Cache invalidated', { 
            method: methodName, 
            pattern 
          });
        }

        return result;
      } catch (error) {
        logger.error('Error in cache-invalidating method', {
          method: methodName,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Helper class for manual cache management
 */
export class CacheManager {
  private static logger = getLogger('CacheManager');

  /**
   * Manually invalidate cache entries
   */
  static async invalidate(patterns: string[]): Promise<void> {
    const cacheService = getCacheService();
    
    for (const pattern of patterns) {
      await cacheService.clear(pattern);
      this.logger.info('Manual cache invalidation', { pattern });
    }
  }

  /**
   * Get cache statistics
   */
  static getStats(): any {
    const cacheService = getCacheService();
    if (cacheService instanceof InMemoryCacheService) {
      return cacheService.getStats();
    }
    return { message: 'Stats not available for this cache implementation' };
  }

  /**
   * Warm up cache with pre-computed values
   */
  static async warmUp(entries: Array<{ key: string; value: any; ttl?: number }>): Promise<void> {
    const cacheService = getCacheService();
    
    for (const entry of entries) {
      await cacheService.set(entry.key, entry.value, entry.ttl);
    }
    
    this.logger.info('Cache warmed up', { count: entries.length });
  }
}