/**
 * HEADER COMPONENT
 * 
 * Main navigation header with user authentication and menu functionality.
 * 
 * HOW IT WORKS:
 * - Displays navigation menu and user controls
 * - Handles responsive mobile menu
 * - Shows user authentication status
 * - Provides quick access to key features
 * - Manages theme switching
 * 
 * FEATURES:
 * - Responsive navigation menu
 * - User authentication display
 * - Mobile hamburger menu
 * - Theme toggle
 * - Search functionality
 * - Notifications
 * 
 * USAGE:
 * - Import in main App component
 * - Wrap with authentication context
 * - Customize navigation items
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import './Header.css';

const Header = () => {
  // Component state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks
  const location = useLocation();
  const { user, isAuthenticated, logout, getDisplayName } = useAuthContext();

  // Navigation items
  const navigationItems = [
    { path: '/', label: 'Home', requiresAuth: false },
    { path: '/about', label: 'About', requiresAuth: false },
    { path: '/contact', label: 'Contact', requiresAuth: false },
    { path: '/dashboard', label: 'Dashboard', requiresAuth: true }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Render navigation items
  const renderNavigationItems = () => {
    return navigationItems
      .filter(item => !item.requiresAuth || isAuthenticated)
      .map(item => (
        <li key={item.path} className="nav-item">
          <Link
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        </li>
      ));
  };

  // Render user menu
  const renderUserMenu = () => {
    if (!isAuthenticated) {
      return (
        <div className="header-auth">
          <Link to="/login">
            <Button variant="outline" size="small">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="small">
              Sign Up
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="header-user">
        <div className="user-info">
          <img
            src={user?.avatar || '/assets/images/default-avatar.png'}
            alt={getDisplayName()}
            className="user-avatar"
          />
          <span className="user-name">{getDisplayName()}</span>
        </div>
        <div className="user-menu">
          <Link to="/profile" className="menu-item">
            Profile
          </Link>
          <Link to="/settings" className="menu-item">
            Settings
          </Link>
          <button onClick={handleLogout} className="menu-item">
            Logout
          </button>
        </div>
      </div>
    );
  };

  // Render search bar
  const renderSearchBar = () => {
    return (
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <img
              src="/assets/images/logo.png"
              alt="React Framework"
              className="logo-image"
            />
            <span className="logo-text">React Framework</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <ul className="nav-list">
            {renderNavigationItems()}
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="header-search">
          {renderSearchBar()}
        </div>

        {/* User Controls */}
        <div className="header-controls">
          {/* Theme Toggle */}
          <button className="theme-toggle" aria-label="Toggle theme">
            🌙
          </button>

          {/* Notifications */}
          <button className="notifications-toggle" aria-label="Notifications">
            🔔
          </button>

          {/* User Menu */}
          {renderUserMenu()}

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav--open' : ''}`}>
        <div className="mobile-nav-container">
          <ul className="mobile-nav-list">
            {renderNavigationItems()}
          </ul>
          
          {/* Mobile Search */}
          <div className="mobile-search">
            {renderSearchBar()}
          </div>

          {/* Mobile User Menu */}
          <div className="mobile-user-menu">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-menu-item">
                  Profile
                </Link>
                <Link to="/settings" className="mobile-menu-item">
                  Settings
                </Link>
                <button onClick={handleLogout} className="mobile-menu-item">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-menu-item">
                  Login
                </Link>
                <Link to="/register" className="mobile-menu-item">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 