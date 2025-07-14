// App constants

export const APP_CONFIG = {
  NAME: 'React Framework',
  VERSION: '1.0.0',
  DESCRIPTION: 'A scalable, maintainable, and well-organized React framework',
  AUTHOR: 'Your Name',
  REPOSITORY: 'https://github.com/yourusername/react-framework',
};

export const APP_FEATURES = {
  AUTHENTICATION: true,
  AUTHORIZATION: true,
  THEMING: true,
  INTERNATIONALIZATION: false,
  PWA: false,
  ANALYTICS: false,
};

export const APP_SETTINGS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Search
  SEARCH_DEBOUNCE: 300,
  MIN_SEARCH_LENGTH: 2,
  
  // File upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  
  // Session
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Notifications
  NOTIFICATION_DURATION: 5000, // 5 seconds
  MAX_NOTIFICATIONS: 5,
};

export const APP_THEMES = {
  LIGHT: {
    name: 'light',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
  },
  DARK: {
    name: 'dark',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
  },
};

export const APP_BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

export const APP_ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const APP_VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
};

export const APP_ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export const APP_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
}; 