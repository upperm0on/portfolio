// Application configuration constants

export const APP_CONFIG = {
  name: 'Frontend App',
  version: '0.0.0',
  environment: import.meta.env.MODE || 'development',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
} as const;

// Feature flags
export const FEATURES = {
  enableAnalytics: false,
  enableDebugMode: import.meta.env.DEV,
} as const;

// App settings
export const SETTINGS = {
  defaultLanguage: 'en',
  itemsPerPage: 10,
  debounceDelay: 300,
} as const;

