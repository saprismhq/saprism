// Centralized configuration for the Saprism application
// This replaces scattered magic numbers and hard-coded values

export const CONFIG = {
  // WebSocket Configuration
  webSocket: {
    maxReconnectAttempts: 10,
    baseReconnectDelay: 1000, // milliseconds
    maxReconnectDelay: 30000, // 30 seconds max delay
    reconnectJitterMax: 1000, // milliseconds
  },

  // AI/OpenAI Configuration
  ai: {
    temperature: 0.3, // Lower temperature for consistent responses
    maxTokens: 800, // Token limit for responses
    cacheTimeout: 300000, // 5 minutes cache timeout
    model: "gpt-4o", // Default OpenAI model
  },

  // Audio/Transcription Configuration
  audio: {
    recordingIntervalMs: 6000, // 6 seconds for transcription chunks
    audioBitsPerSecond: 128000, // Audio quality
    supportedMimeTypes: [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus'
    ]
  },

  // Session/Authentication Configuration
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
    httpOnly: true,
    secure: true,
  },

  // UI/UX Configuration
  ui: {
    toastDuration: 3000, // 3 seconds
    loadingSpinnerDelay: 200, // milliseconds before showing spinner
    debounceDelay: 300, // milliseconds for input debouncing
  },

  // Call Interface Configuration
  call: {
    defaultAudioEnabled: true,
    defaultVideoEnabled: true,
    participantListMaxHeight: 16, // Tailwind unit (64px)
    maxParticipants: 50,
  },

  // Telephony Error Handling
  telephony: {
    maxTranscriptionFailures: 5,
    fallbackMessage: "Transcription temporarily unavailable - audio recording continues",
    audioBackupEnabled: true,
  }
} as const;

// Environment-specific overrides
export const ENV_CONFIG = {
  development: {
    ai: {
      temperature: 0.5, // Higher creativity in dev
    },
    webSocket: {
      maxReconnectAttempts: 3, // Fewer retries in dev
    }
  },
  production: {
    session: {
      secure: true, // Force secure cookies in production
    },
    ai: {
      temperature: 0.2, // More deterministic in production
    }
  }
} as const;

// Deep merge utility for nested configuration objects
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
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
export function getConfig() {
  const env = import.meta.env.MODE || 'development';
  const envOverrides = ENV_CONFIG[env as keyof typeof ENV_CONFIG] || {};
  
  return deepMerge(CONFIG, envOverrides);
}