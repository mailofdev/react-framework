/**
 * ROUTES CONFIGURATION
 * 
 * This file defines all application routes and their configurations.
 * 
 * HOW IT WORKS:
 * - Each route object contains path, component, and optional metadata
 * - Protected routes have 'requiresAuth: true' for authentication checks
 * - Lazy loading is implemented for better performance
 * - Nested routes support complex navigation structures
 * 
 * USAGE:
 * - Import this config in your router setup
 * - Use with React Router for navigation
 * - Add route guards for protected routes
 */

import { lazy } from 'react';

// Lazy load components for better performance
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: 'Home',
    description: 'Welcome to our React Framework'
  },
  {
    path: '/about',
    component: About,
    title: 'About',
    description: 'Learn more about our framework'
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact',
    description: 'Get in touch with us'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    requiresAuth: true, // Protected route
    title: 'Dashboard',
    description: 'User dashboard and controls'
  }
];

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return routes.find(route => route.path === path);
};

// Helper function to get all protected routes
export const getProtectedRoutes = () => {
  return routes.filter(route => route.requiresAuth);
}; 