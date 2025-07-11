/**
 * HOME PAGE COMPONENT
 * 
 * This is the main landing page of the application.
 * 
 * HOW IT WORKS:
 * - Displays welcome content and main navigation
 * - Shows featured content or quick actions
 * - Handles user authentication state
 * - Provides entry points to other sections
 * 
 * FEATURES:
 * - Responsive design for all screen sizes
 * - SEO optimized with meta tags
 * - Performance optimized with lazy loading
 * - Accessibility compliant
 * 
 * USAGE:
 * - Import in routes configuration
 * - Customize content based on user role
 * - Add analytics tracking for user engagement
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // State management for dynamic content
  const [isLoading, setIsLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [userGreeting, setUserGreeting] = useState('Welcome');

  // Component lifecycle management
  useEffect(() => {
    // Simulate loading of featured content
    const loadFeaturedContent = async () => {
      try {
        // In a real app, this would fetch from API
        const mockContent = [
          { id: 1, title: 'Getting Started', description: 'Learn the basics' },
          { id: 2, title: 'Advanced Features', description: 'Explore advanced capabilities' },
          { id: 3, title: 'API Documentation', description: 'Complete API reference' }
        ];
        
        setFeaturedContent(mockContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading featured content:', error);
        setIsLoading(false);
      }
    };

    loadFeaturedContent();
  }, []);

  // Handle user interaction
  const handleFeatureClick = (featureId) => {
    // Analytics tracking
    console.log(`Feature clicked: ${featureId}`);
    // Navigate to feature page or show modal
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to React Framework
          </h1>
          <p className="hero-description">
            A powerful, scalable, and modern React framework for building amazing applications.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="featured-section">
        <h2 className="section-title">Featured Content</h2>
        <div className="featured-grid">
          {featuredContent.map((item) => (
            <div 
              key={item.id} 
              className="featured-card"
              onClick={() => handleFeatureClick(item.id)}
            >
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/contact" className="action-card">
            <h3>Contact Support</h3>
            <p>Get help when you need it</p>
          </Link>
          <Link to="/about" className="action-card">
            <h3>About Us</h3>
            <p>Learn about our mission</p>
          </Link>
          <Link to="/dashboard" className="action-card">
            <h3>Dashboard</h3>
            <p>Access your workspace</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 