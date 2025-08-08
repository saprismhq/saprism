// Environment configuration for LiveKit

export const LIVEKIT_CONFIG = {
  url: import.meta.env.VITE_LIVEKIT_URL || 'wss://localhost:7880',
  apiKey: import.meta.env.VITE_LIVEKIT_API_KEY,
  apiSecret: import.meta.env.VITE_LIVEKIT_API_SECRET,
};

// Validate required environment variables
export function validateLiveKitConfig() {
  if (!LIVEKIT_CONFIG.url) {
    console.warn('VITE_LIVEKIT_URL not configured. Using default localhost URL.');
  }
  
  if (!LIVEKIT_CONFIG.apiKey || !LIVEKIT_CONFIG.apiSecret) {
    console.warn('LiveKit API credentials not configured. Call functionality will use placeholder tokens.');
  }
}

// Call this on app initialization
validateLiveKitConfig();