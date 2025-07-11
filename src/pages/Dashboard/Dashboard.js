/**
 * DASHBOARD PAGE COMPONENT
 * 
 * This is the main user dashboard with analytics, controls, and user management.
 * 
 * HOW IT WORKS:
 * - Displays user-specific data and analytics
 * - Provides quick access to common actions
 * - Shows real-time updates and notifications
 * - Handles user preferences and settings
 * 
 * FEATURES:
 * - Interactive charts and graphs
 * - Real-time data updates
 * - User activity tracking
 * - Quick action buttons
 * - Responsive design for all devices
 * - Role-based access control
 * 
 * USAGE:
 * - Import in routes configuration (protected route)
 * - Connect to backend APIs for data
 * - Add analytics tracking for user behavior
 * - Implement role-based content display
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  // Dashboard state management
  const [userData, setUserData] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const mockUserData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: '/assets/images/avatar.jpg',
    lastLogin: '2024-01-15T10:30:00Z',
    projects: 12,
    tasks: 8
  };

  const mockAnalytics = {
    totalUsers: 15420,
    activeUsers: 8920,
    totalProjects: 456,
    completedTasks: 1234,
    revenue: 125000,
    growth: 15.5
  };

  const mockRecentActivity = [
    {
      id: 1,
      type: 'project_created',
      title: 'New Project Created',
      description: 'Project "E-commerce Platform" was created',
      timestamp: '2024-01-15T09:30:00Z',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'task_completed',
      title: 'Task Completed',
      description: 'Task "Setup Database" was completed',
      timestamp: '2024-01-15T08:45:00Z',
      user: 'Jane Smith'
    },
    {
      id: 3,
      type: 'user_registered',
      title: 'New User Registered',
      description: 'User "alice@example.com" joined the platform',
      timestamp: '2024-01-15T08:15:00Z',
      user: 'System'
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'info',
      title: 'System Update',
      message: 'Scheduled maintenance on Jan 20th, 2-4 AM EST',
      timestamp: '2024-01-15T07:00:00Z',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Backup Complete',
      message: 'Daily backup completed successfully',
      timestamp: '2024-01-15T06:00:00Z',
      read: true
    }
  ];

  // Component lifecycle management
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API calls - replace with actual API endpoints
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setUserData(mockUserData);
        setAnalytics(mockAnalytics);
        setRecentActivity(mockRecentActivity);
        setNotifications(mockNotifications);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Handle tab switching
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Analytics tracking
    console.log(`Dashboard tab changed to: ${tabName}`);
  };

  // Handle notification actions
  const handleNotificationAction = (notificationId, action) => {
    console.log(`Notification ${notificationId} action: ${action}`);
    // Update notification status
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action logic
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="welcome-message">
            Welcome back, {userData?.name}!
          </p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img 
              src={userData?.avatar} 
              alt={userData?.name} 
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">{userData?.name}</span>
              <span className="user-role">{userData?.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="actions-grid">
          <button 
            className="action-button"
            onClick={() => handleQuickAction('new_project')}
          >
            <span className="action-icon">➕</span>
            <span className="action-text">New Project</span>
          </button>
          <button 
            className="action-button"
            onClick={() => handleQuickAction('invite_user')}
          >
            <span className="action-icon">👥</span>
            <span className="action-text">Invite User</span>
          </button>
          <button 
            className="action-button"
            onClick={() => handleQuickAction('generate_report')}
          >
            <span className="action-icon">📊</span>
            <span className="action-text">Generate Report</span>
          </button>
          <button 
            className="action-button"
            onClick={() => handleQuickAction('settings')}
          >
            <span className="action-icon">⚙️</span>
            <span className="action-text">Settings</span>
          </button>
        </div>
      </section>

      {/* Analytics Overview */}
      <section className="analytics-overview">
        <h2>Analytics Overview</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="card-header">
              <h3>Total Users</h3>
              <span className="trend positive">+{analytics.growth}%</span>
            </div>
            <div className="card-value">{analytics.totalUsers.toLocaleString()}</div>
            <div className="card-subtitle">Active: {analytics.activeUsers.toLocaleString()}</div>
          </div>
          <div className="analytics-card">
            <div className="card-header">
              <h3>Projects</h3>
              <span className="trend positive">+5%</span>
            </div>
            <div className="card-value">{analytics.totalProjects}</div>
            <div className="card-subtitle">Active projects</div>
          </div>
          <div className="analytics-card">
            <div className="card-header">
              <h3>Tasks Completed</h3>
              <span className="trend positive">+12%</span>
            </div>
            <div className="card-value">{analytics.completedTasks}</div>
            <div className="card-subtitle">This month</div>
          </div>
          <div className="analytics-card">
            <div className="card-header">
              <h3>Revenue</h3>
              <span className="trend positive">+{analytics.growth}%</span>
            </div>
            <div className="card-value">${analytics.revenue.toLocaleString()}</div>
            <div className="card-subtitle">This quarter</div>
          </div>
        </div>
      </section>

      {/* Dashboard Content Tabs */}
      <section className="dashboard-content">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => handleTabChange('activity')}
          >
            Recent Activity
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => handleTabChange('notifications')}
          >
            Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Your Projects</h3>
                  <div className="project-stats">
                    <div className="stat-item">
                      <span className="stat-label">Active Projects</span>
                      <span className="stat-value">{userData?.projects}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Pending Tasks</span>
                      <span className="stat-value">{userData?.tasks}</span>
                    </div>
                  </div>
                  <Link to="/projects" className="view-all-link">
                    View All Projects →
                  </Link>
                </div>
                <div className="overview-card">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    {recentActivity.slice(0, 3).map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">📝</div>
                        <div className="activity-content">
                          <div className="activity-title">{activity.title}</div>
                          <div className="activity-time">
                            {formatTimestamp(activity.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-content">
              <h3>Recent Activity</h3>
              <div className="activity-timeline">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="activity-header">
                        <h4>{activity.title}</h4>
                        <span className="activity-time">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                      <p className="activity-description">{activity.description}</p>
                      <span className="activity-user">by {activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-content">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.type} ${!notification.read ? 'unread' : ''}`}
                  >
                    <div className="notification-icon">
                      {notification.type === 'info' && 'ℹ️'}
                      {notification.type === 'success' && '✅'}
                      {notification.type === 'warning' && '⚠️'}
                      {notification.type === 'error' && '❌'}
                    </div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h4>{notification.title}</h4>
                        <span className="notification-time">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="notification-message">{notification.message}</p>
                    </div>
                    <div className="notification-actions">
                      {!notification.read && (
                        <button 
                          className="mark-read-btn"
                          onClick={() => handleNotificationAction(notification.id, 'mark_read')}
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 