// Route constants

export const ROUTES = {
  // Public routes
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    ABOUT: '/about',
    CONTACT: '/contact',
    PRIVACY: '/privacy',
    TERMS: '/terms',
  },

  // Protected routes
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    NOTIFICATIONS: '/notifications',
  },

  // User routes
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
    PREFERENCES: '/user/preferences',
    ACTIVITY: '/user/activity',
  },

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    PERMISSIONS: '/admin/permissions',
    SETTINGS: '/admin/settings',
    REPORTS: '/admin/reports',
    ANALYTICS: '/admin/analytics',
  },

  // Error routes
  ERROR: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
    FORBIDDEN: '/403',
    SERVER_ERROR: '/500',
  },
};

export const ROUTE_NAMES = {
  HOME: 'Home',
  LOGIN: 'Login',
  REGISTER: 'Register',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  USERS: 'Users',
  ADMIN: 'Admin',
  NOT_FOUND: 'Page Not Found',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  SERVER_ERROR: 'Server Error',
};

export const ROUTE_PERMISSIONS = {
  PUBLIC: [],
  USER: ['user', 'admin', 'moderator'],
  ADMIN: ['admin'],
  MODERATOR: ['admin', 'moderator'],
};

export const ROUTE_METADATA = {
  [ROUTES.PUBLIC.HOME]: {
    title: 'Home',
    description: 'Welcome to our application',
    requiresAuth: false,
  },
  [ROUTES.PUBLIC.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    requiresAuth: false,
  },
  [ROUTES.PUBLIC.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
    requiresAuth: false,
  },
  [ROUTES.PROTECTED.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Your personal dashboard',
    requiresAuth: true,
  },
  [ROUTES.USER.PROFILE]: {
    title: 'Profile',
    description: 'Manage your profile',
    requiresAuth: true,
  },
  [ROUTES.ADMIN.DASHBOARD]: {
    title: 'Admin Dashboard',
    description: 'Administrative dashboard',
    requiresAuth: true,
    requiredRole: 'admin',
  },
}; 