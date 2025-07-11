/**
 * API CLIENT CONFIGURATION
 * 
 * This file configures the HTTP client for making API requests.
 * 
 * HOW IT WORKS:
 * - Creates axios instance with default configuration
 * - Sets up request/response interceptors
 * - Handles authentication tokens automatically
 * - Provides error handling and retry logic
 * - Supports request/response logging
 * 
 * FEATURES:
 * - Automatic token management
 * - Request/response interceptors
 * - Error handling and retry logic
 * - Request timeout configuration
 * - Base URL configuration per environment
 * 
 * USAGE:
 * - Import this client in service files
 * - Use for all API requests
 * - Configure interceptors for global handling
 */

import axios from 'axios';
import { getApiConfig, getDefaultHeaders, ERROR_CODES } from '../../config/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: getApiConfig().baseURL,
  timeout: getApiConfig().timeout,
  headers: getDefaultHeaders(),
  withCredentials: true // Include cookies in requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token to requests
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for logging
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;

    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        duration: `${duration}ms`,
        data: response.data
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === ERROR_CODES.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResponse = await axios.post('/auth/refresh', {
            refreshToken
          });

          const { token } = refreshResponse.data;
          localStorage.setItem('token', token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data,
        headers: error.response.headers
      });

      // Handle specific error codes
      switch (error.response.status) {
        case ERROR_CODES.FORBIDDEN:
          console.error('Access forbidden');
          break;
        case ERROR_CODES.NOT_FOUND:
          console.error('Resource not found');
          break;
        case ERROR_CODES.SERVER_ERROR:
          console.error('Server error occurred');
          break;
        default:
          console.error('Unexpected error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async (config, retries = getApiConfig().retries) => {
  try {
    return await apiClient(config);
  } catch (error) {
    if (retries > 0 && !error.response) {
      // Only retry network errors, not HTTP errors
      console.log(`Retrying request... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

// Enhanced API methods with retry logic
export const api = {
  get: (url, config = {}) => retryRequest({ ...config, method: 'GET', url }),
  post: (url, data = {}, config = {}) => retryRequest({ ...config, method: 'POST', url, data }),
  put: (url, data = {}, config = {}) => retryRequest({ ...config, method: 'PUT', url, data }),
  patch: (url, data = {}, config = {}) => retryRequest({ ...config, method: 'PATCH', url, data }),
  delete: (url, config = {}) => retryRequest({ ...config, method: 'DELETE', url }),
  
  // Upload file
  upload: (url, file, onProgress = null, config = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return retryRequest({
      ...config,
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      },
      onUploadProgress: onProgress
    });
  },
  
  // Download file
  download: (url, filename = 'download', config = {}) => {
    return retryRequest({
      ...config,
      method: 'GET',
      url,
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  }
};

export default apiClient; 