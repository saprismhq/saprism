// AI Provider Factory - creates and configures AI providers with decorators

import type { AIProvider } from './interfaces/AIProvider';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { CacheDecorator, MemoryCacheStrategy, HybridCacheStrategy } from './decorators/CacheDecorator';
import { DebounceDecorator } from './decorators/DebounceDecorator';
import { ResilienceDecorator } from './decorators/ResilienceDecorator';
import { getServerConfig } from '../../config/index';

// Supported AI providers
export type AIProviderType = 'openai' | 'anthropic' | 'gemini';

export interface ProviderFactoryOptions {
  provider?: AIProviderType;
  enableCaching?: boolean;
  enableDebouncing?: boolean;
  enableResilience?: boolean;
  cacheStrategy?: 'memory' | 'redis' | 'hybrid';
}

export class AIProviderFactory {
  private static instance: AIProviderFactory;
  private providers = new Map<string, AIProvider>();

  private constructor() {}

  public static getInstance(): AIProviderFactory {
    if (!AIProviderFactory.instance) {
      AIProviderFactory.instance = new AIProviderFactory();
    }
    return AIProviderFactory.instance;
  }

  /**
   * Create and configure an AI provider with decorators
   */
  public createProvider(options: ProviderFactoryOptions = {}): AIProvider {
    const config = getServerConfig();
    const {
      provider = 'openai',
      enableCaching = config.ai.caching.enabled,
      enableDebouncing = true,
      enableResilience = true,
      cacheStrategy = config.ai.caching.strategy
    } = options;

    // Create cache key for memoization
    const cacheKey = JSON.stringify(options);
    
    // Return cached provider if available
    if (this.providers.has(cacheKey)) {
      return this.providers.get(cacheKey)!;
    }

    let aiProvider: AIProvider;

    // Create base provider
    switch (provider) {
      case 'openai':
        aiProvider = new OpenAIProvider(config.ai.providers.openai);
        break;
      case 'anthropic':
        // TODO: Implement AnthropicProvider
        throw new Error('Anthropic provider not yet implemented');
      case 'gemini':
        // TODO: Implement GeminiProvider
        throw new Error('Gemini provider not yet implemented');
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }

    // Wrap with decorators in dependency order
    // Note: Order matters! Resilience -> Debounce -> Cache
    
    // 1. Resilience (innermost - handles retries and circuit breaking)
    if (enableResilience) {
      aiProvider = new ResilienceDecorator(aiProvider, config.ai.resilience);
    }

    // 2. Debouncing (middle - prevents rapid duplicate calls)
    if (enableDebouncing) {
      aiProvider = new DebounceDecorator(aiProvider, config.ai.debouncing);
    }

    // 3. Caching (outermost - checks cache first)
    if (enableCaching) {
      const cacheStrategyImpl = this.createCacheStrategy(cacheStrategy, config.ai.caching);
      aiProvider = new CacheDecorator(aiProvider, cacheStrategyImpl, config.ai.caching);
    }

    // Cache the configured provider
    this.providers.set(cacheKey, aiProvider);

    console.log(`Created AI provider: ${provider} with decorators: ${[
      enableResilience && 'resilience',
      enableDebouncing && 'debouncing', 
      enableCaching && `caching(${cacheStrategy})`
    ].filter(Boolean).join(', ')}`);

    return aiProvider;
  }

  /**
   * Create the appropriate cache strategy
   */
  private createCacheStrategy(strategy: 'memory' | 'redis' | 'hybrid', cacheConfig: any) {
    switch (strategy) {
      case 'memory':
        return new MemoryCacheStrategy(cacheConfig.maxSize);
      case 'redis':
        // TODO: Implement Redis cache when available
        console.warn('Redis cache not implemented, falling back to memory cache');
        return new MemoryCacheStrategy(cacheConfig.maxSize);
      case 'hybrid':
        return new HybridCacheStrategy(Math.min(cacheConfig.maxSize / 5, 100));
      default:
        return new MemoryCacheStrategy(cacheConfig.maxSize);
    }
  }

  /**
   * Get a pre-configured provider for the current environment
   */
  public static getDefaultProvider(): AIProvider {
    const factory = AIProviderFactory.getInstance();
    const providerType = (process.env.AI_PROVIDER as AIProviderType) || 'openai';
    
    return factory.createProvider({
      provider: providerType,
      enableCaching: true,
      enableDebouncing: true,
      enableResilience: true
    });
  }

  /**
   * Create a provider optimized for testing
   */
  public static getTestProvider(): AIProvider {
    const factory = AIProviderFactory.getInstance();
    
    return factory.createProvider({
      provider: 'openai',
      enableCaching: false,    // No caching in tests
      enableDebouncing: false, // No debouncing in tests
      enableResilience: false  // No retries in tests
    });
  }

  /**
   * Create a provider with minimal decorators for performance testing
   */
  public static getMinimalProvider(): AIProvider {
    const factory = AIProviderFactory.getInstance();
    
    return factory.createProvider({
      provider: 'openai',
      enableCaching: false,
      enableDebouncing: false,
      enableResilience: true   // Keep resilience for production safety
    });
  }

  /**
   * Clear provider cache (useful for configuration changes)
   */
  public clearCache(): void {
    this.providers.clear();
    console.log('AI provider cache cleared');
  }

  /**
   * Get provider health status
   */
  public getProviderStatus(provider: AIProvider): any {
    if (provider instanceof ResilienceDecorator) {
      return {
        circuitBreakers: provider.getCircuitBreakerStatus(),
        type: 'resilient'
      };
    }
    
    return {
      type: 'basic',
      status: 'healthy'
    };
  }
}

// Export convenience functions
export const createAIProvider = (options?: ProviderFactoryOptions): AIProvider => {
  return AIProviderFactory.getInstance().createProvider(options);
};

export const getDefaultAIProvider = (): AIProvider => {
  return AIProviderFactory.getDefaultProvider();
};

export const getTestAIProvider = (): AIProvider => {
  return AIProviderFactory.getTestProvider();
};