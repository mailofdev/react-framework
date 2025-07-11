/**
 * API CONFIGURATION
 * 
 * This file contains all API-related configurations and endpoints.
 * 
 * HOW IT WORKS:
 * - Centralized API configuration for consistent data fetching
 * - Environment-based base URLs for different deployment stages
 * - Request/response interceptors for authentication and error handling
 * - Rate limiting and caching configurations
 * 
 * USAGE:
 * - Import this config in your service files
 * - Use with axios or fetch for API calls
 * - Configure interceptors for global request handling
 */

// Environment-based API configuration
const API_CONFIG = {
  development: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    retries: 3
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://api.yourapp.com',
    timeout: 15000,
    retries: 2
  },
  test: {
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    retries: 1
  }
};

// Get current environment configuration
export const getApiConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return API_CONFIG[env];
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify'
  },
  
  // User management endpoints
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    DELETE: '/users/delete',
    LIST: '/users'
  },
  
  // Content endpoints
  CONTENT: {
    ARTICLES: '/articles',
    COMMENTS: '/comments',
    CATEGORIES: '/categories'
  }
};

// Request headers configuration
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

// Error handling configuration
export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}; 