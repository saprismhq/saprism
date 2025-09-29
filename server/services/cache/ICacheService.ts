/**
 * Generic cache service interface for flexible caching across the application
 */
export interface ICacheService {
  /**
   * Get a cached value
   * @param key Cache key
   * @returns Cached value or null if not found/expired
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set a value in cache
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in seconds (optional)
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Delete a specific key from cache
   * @param key Cache key to delete
   */
  delete(key: string): Promise<void>;

  /**
   * Clear cache entries matching a pattern
   * @param pattern Pattern to match (e.g., "journey:*")
   */
  clear(pattern?: string): Promise<void>;

  /**
   * Check if a key exists in cache
   * @param key Cache key
   */
  has(key: string): Promise<boolean>;

  /**
   * Get remaining TTL for a key
   * @param key Cache key
   * @returns TTL in seconds or -1 if no TTL set
   */
  ttl(key: string): Promise<number>;
}

/**
 * Cache entry structure
 */
export interface CacheEntry<T = any> {
  value: T;
  expiresAt?: number; // Unix timestamp in milliseconds
  createdAt: number;
  hits?: number; // Track usage for analytics
}

/**
 * Cache options for configuration
 */
export interface CacheOptions {
  defaultTTL?: number; // Default TTL in seconds
  maxSize?: number; // Maximum number of entries
  cleanupInterval?: number; // Cleanup interval in seconds
  namespace?: string; // Cache namespace for isolation
}