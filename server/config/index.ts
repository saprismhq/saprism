// Server-side configuration management
// Mirrors client-side config pattern with deep merge and environment overrides

// Base configuration for AI services
const AI_CONFIG = {
  providers: {
    openai: {
      model: "gpt-4o",
      temperature: {
        analysis: 0.3,
        coaching: 0.4,
        chat: 0.7,
        methodology: 0.4,
        followUp: 0.3
      },
      maxTokens: {
        analysis: 800,
        coaching: 2000,
        chat: 150,
        chatExtended: 100,
        methodology: 1500,
        followUp: 500
      },
      timeouts: {
        request: 30000,
        retry: 5000
      }
    },
    anthropic: {
      model: "claude-3-5-sonnet-20241022",
      temperature: {
        analysis: 0.2,
        coaching: 0.3,
        chat: 0.6,
        methodology: 0.3,
        followUp: 0.2
      },
      maxTokens: {
        analysis: 1000,
        coaching: 2500,
        chat: 200,
        chatExtended: 150,
        methodology: 2000,
        followUp: 600
      },
      timeouts: {
        request: 45000,
        retry: 7000
      }
    }
  },
  
  debouncing: {
    noteAnalysis: 2000,        // 2s debounce for rapid note changes
    coachingSuggestions: 3000,  // 3s for coaching generation
    chatResponses: 500,         // 500ms for chat
    methodologyInsights: 2500,  // 2.5s for methodology
    followUpQuestions: 1500     // 1.5s for follow-up questions
  },
  
  caching: {
    enabled: true,
    ttl: {
      analysis: 300,        // 5 minutes for note analysis
      coaching: 600,        // 10 minutes for coaching suggestions
      chat: 180,           // 3 minutes for chat responses
      methodology: 900,     // 15 minutes for methodology insights
      followUp: 240        // 4 minutes for follow-up questions
    },
    maxSize: 1000,
    strategy: 'memory' as 'memory' | 'redis' | 'hybrid'
  },
  
  resilience: {
    retryAttempts: 3,
    circuitBreakerThreshold: 5,
    circuitBreakerTimeout: 60000,  // 1 minute
    backoffMultiplier: 2,
    maxBackoffMs: 10000
  },
  
  transcription: {
    whisper: {
      model: 'whisper-1',
      language: 'en',
      responseFormat: 'text',
      temperature: 0.2,
      prompt: 'This is a business sales meeting conversation. Please transcribe clearly and accurately.'
    }
  }
} as const;

// Environment-specific overrides
const ENV_CONFIG = {
  development: {
    debouncing: {
      noteAnalysis: 1000,      // Faster in dev for better DX
      chatResponses: 200,
      coachingSuggestions: 1500,
      methodologyInsights: 1000,
      followUpQuestions: 750
    },
    caching: {
      ttl: {
        analysis: 60,          // Shorter cache in dev
        coaching: 120,
        chat: 30
      }
    },
    resilience: {
      retryAttempts: 1,        // Less aggressive retries in dev
      circuitBreakerThreshold: 10
    }
  },
  production: {
    caching: {
      strategy: 'hybrid' as const,  // Use Redis in production
      maxSize: 5000
    },
    resilience: {
      retryAttempts: 5,        // More resilient in production
      circuitBreakerThreshold: 3
    }
  },
  test: {
    debouncing: {
      noteAnalysis: 0,         // No debouncing in tests
      chatResponses: 0,
      coachingSuggestions: 0
    },
    caching: {
      enabled: false           // No caching in tests
    },
    resilience: {
      retryAttempts: 0         // No retries in tests
    }
  }
} as const;

// Deep merge utility for nested configuration objects
function deepMerge<T extends Record<string, any>>(target: T, source: any): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Get configuration with environment overrides (deep merged)
export function getServerConfig() {
  const env = process.env.NODE_ENV || 'development';
  const envOverrides = ENV_CONFIG[env as keyof typeof ENV_CONFIG] || {};
  
  return {
    ai: deepMerge(AI_CONFIG, envOverrides)
  };
}

// Export types for use throughout the application
export type AIConfig = typeof AI_CONFIG;
export type ProviderConfig = typeof AI_CONFIG.providers.openai;
export type CacheConfig = typeof AI_CONFIG.caching;
export type ResilienceConfig = typeof AI_CONFIG.resilience;
export type DebounceConfig = typeof AI_CONFIG.debouncing;
export type TranscriptionConfig = typeof AI_CONFIG.transcription;

// Export the configuration object for direct access
export { AI_CONFIG };