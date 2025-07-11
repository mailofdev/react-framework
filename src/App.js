/**
 * MAIN APP COMPONENT
 * 
 * This is the root component that sets up routing and global providers.
 * 
 * HOW IT WORKS:
 * - Configures React Router for navigation
 * - Wraps app with authentication context
 * - Provides global styling and theme
 * - Handles route protection and redirects
 * 
 * FEATURES:
 * - Client-side routing
 * - Authentication context
 * - Global error boundaries
 * - Responsive layout
 * 
 * USAGE:
 * - Import and render in index.js
 * - Add new routes in config/routes.js
 * - Wrap with additional providers as needed
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header/Header';
import './App.css';

// Lazy load page components for better performance
const Home = React.lazy(() => import('./pages/Home/Home'));
const About = React.lazy(() => import('./pages/About/About'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or contact support.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            {/* Header Navigation */}
            <Header />
            
            {/* Main Content */}
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* 404 Page */}
                  <Route path="*" element={
                    <div className="not-found">
                      <h1>404 - Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                      <a href="/">Go back home</a>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </main>
            
            {/* Footer */}
            <footer className="footer">
              <div className="footer-content">
                <p>&copy; 2024 React Framework. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
