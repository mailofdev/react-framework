/**
 * AUTHENTICATION HOOK
 * 
 * This custom hook manages user authentication state and operations.
 * 
 * HOW IT WORKS:
 * - Manages user authentication state
 * - Handles login, logout, and registration
 * - Provides user information and permissions
 * - Manages authentication tokens
 * - Handles token refresh automatically
 * 
 * FEATURES:
 * - Automatic token refresh
 * - Persistent authentication state
 * - Role-based access control
 * - Secure token storage
 * - Session management
 * 
 * USAGE:
 * - Import in components that need auth
 * - Use for protected routes
 * - Access user data and permissions
 * - Handle authentication flows
 */

import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api/client';
import { ENDPOINTS } from '../config/api';

// Default user state
const defaultUser = {
  id: null,
  email: '',
  name: '',
  role: 'guest',
  permissions: [],
  isAuthenticated: false,
  avatar: null
};

export const useAuth = () => {
  // Authentication state
  const [user, setUser] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check authentication status
  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setUser(defaultUser);
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await api.get(ENDPOINTS.AUTH.VERIFY);
      const userData = response.data;

      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        permissions: userData.permissions || [],
        isAuthenticated: true,
        avatar: userData.avatar
      });

    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(defaultUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
      const { token, refreshToken, user: userData } = response.data;

      // Store tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Update user state
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        permissions: userData.permissions || [],
        isAuthenticated: true,
        avatar: userData.avatar
      });

      return { success: true, user: userData };

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      // Reset user state
      setUser(defaultUser);
      setError(null);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
      const { token, refreshToken, user: newUser } = response.data;

      // Store tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Update user state
      setUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        permissions: newUser.permissions || [],
        isAuthenticated: true,
        avatar: newUser.avatar
      });

      return { success: true, user: newUser };

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.put(ENDPOINTS.USERS.UPDATE, profileData);
      const updatedUser = response.data;

      // Update user state
      setUser(prev => ({
        ...prev,
        ...updatedUser
      }));

      return { success: true, user: updatedUser };

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    return user.permissions.includes(permission);
  }, [user.permissions]);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return user.role === role;
  }, [user.role]);

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles) => {
    return roles.includes(user.role);
  }, [user.role]);

  // Get user's display name
  const getDisplayName = useCallback(() => {
    return user.name || user.email || 'Guest';
  }, [user.name, user.email]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user,
    isLoading,
    error,
    
    // Actions
    login,
    logout,
    register,
    updateProfile,
    checkAuthStatus,
    clearError,
    
    // Utilities
    hasPermission,
    hasRole,
    hasAnyRole,
    getDisplayName,
    
    // Computed values
    isAuthenticated: user.isAuthenticated,
    isGuest: !user.isAuthenticated,
    isAdmin: user.role === 'admin',
    isUser: user.role === 'user'
  };
}; 