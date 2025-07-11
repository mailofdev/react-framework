/**
 * AUTHENTICATION CONTEXT PROVIDER
 * 
 * This context provides authentication state and methods throughout the app.
 * 
 * HOW IT WORKS:
 * - Wraps the app with authentication context
 * - Provides auth state to all child components
 * - Manages global authentication state
 * - Handles authentication state persistence
 * - Provides auth methods to components
 * 
 * FEATURES:
 * - Global authentication state
 * - Automatic token management
 * - Role-based access control
 * - Session persistence
 * - Error handling
 * 
 * USAGE:
 * - Wrap your app with AuthProvider
 * - Use useAuth hook in components
 * - Access auth state and methods globally
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

// Create authentication context
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    default:
      return state;
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authHook = useAuth();

  // Sync auth hook state with context
  useEffect(() => {
    if (authHook.user) {
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: authHook.user
      });
    } else if (!authHook.isLoading) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, [authHook.user, authHook.isLoading]);

  // Sync loading state
  useEffect(() => {
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: authHook.isLoading
    });
  }, [authHook.isLoading]);

  // Sync error state
  useEffect(() => {
    if (authHook.error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: authHook.error
      });
    }
  }, [authHook.error]);

  // Context value
  const contextValue = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions from hook
    login: authHook.login,
    logout: authHook.logout,
    register: authHook.register,
    updateProfile: authHook.updateProfile,
    checkAuthStatus: authHook.checkAuthStatus,
    clearError: authHook.clearError,
    
    // Utilities
    hasPermission: authHook.hasPermission,
    hasRole: authHook.hasRole,
    hasAnyRole: authHook.hasAnyRole,
    getDisplayName: authHook.getDisplayName,
    
    // Computed values
    isGuest: !state.isAuthenticated,
    isAdmin: state.user?.role === 'admin',
    isUser: state.user?.role === 'user'
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

// Higher-order component for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading } = useAuthContext();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <div>Please log in to access this page.</div>;
    }
    
    return <Component {...props} />;
  };
};

// Higher-order component for role-based access
export const withRole = (Component, requiredRoles) => {
  return function RoleBasedComponent(props) {
    const { user, isLoading, hasAnyRole } = useAuthContext();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!user || !hasAnyRole(requiredRoles)) {
      return <div>You don't have permission to access this page.</div>;
    }
    
    return <Component {...props} />;
  };
};

// Higher-order component for permission-based access
export const withPermission = (Component, requiredPermissions) => {
  return function PermissionBasedComponent(props) {
    const { user, isLoading, hasPermission } = useAuthContext();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!user || !requiredPermissions.every(permission => hasPermission(permission))) {
      return <div>You don't have permission to access this page.</div>;
    }
    
    return <Component {...props} />;
  };
}; 