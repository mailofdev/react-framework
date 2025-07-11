/**
 * ABOUT PAGE COMPONENT
 * 
 * This page provides information about the framework, team, and mission.
 * 
 * HOW IT WORKS:
 * - Displays company/framework information
 * - Shows team member profiles
 * - Provides mission and vision statements
 * - Includes contact information and social links
 * 
 * FEATURES:
 * - Dynamic content loading from CMS or API
 * - Team member profiles with social links
 * - Timeline of company/framework milestones
 * - Interactive elements for engagement
 * 
 * USAGE:
 * - Import in routes configuration
 * - Customize content based on organization
 * - Add analytics for page engagement
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  // State management for dynamic content
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mission');

  // Component lifecycle management
  useEffect(() => {
    const loadTeamData = async () => {
      try {
        // Mock team data - in real app, fetch from API
        const mockTeam = [
          {
            id: 1,
            name: 'John Doe',
            role: 'Lead Developer',
            bio: 'Full-stack developer with 8+ years of experience',
            avatar: '/assets/images/team/john.jpg',
            social: {
              linkedin: 'https://linkedin.com/in/johndoe',
              github: 'https://github.com/johndoe',
              twitter: 'https://twitter.com/johndoe'
            }
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'UI/UX Designer',
            bio: 'Creative designer focused on user experience',
            avatar: '/assets/images/team/jane.jpg',
            social: {
              linkedin: 'https://linkedin.com/in/janesmith',
              dribbble: 'https://dribbble.com/janesmith',
              behance: 'https://behance.net/janesmith'
            }
          }
        ];
        
        setTeamMembers(mockTeam);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading team data:', error);
        setIsLoading(false);
      }
    };

    loadTeamData();
  }, []);

  // Handle tab switching
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Analytics tracking
    console.log(`Tab changed to: ${tabName}`);
  };

  // Handle social link clicks
  const handleSocialClick = (platform, url) => {
    // Analytics tracking
    console.log(`Social link clicked: ${platform}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="about-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-header">
        <div className="header-content">
          <h1 className="page-title">About Our Framework</h1>
          <p className="page-subtitle">
            Building the future of web development with modern React solutions
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="tab-navigation">
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'mission' ? 'active' : ''}`}
            onClick={() => handleTabChange('mission')}
          >
            Mission
          </button>
          <button 
            className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => handleTabChange('team')}
          >
            Our Team
          </button>
          <button 
            className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => handleTabChange('timeline')}
          >
            Timeline
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <section className="tab-content">
        {activeTab === 'mission' && (
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              We're dedicated to creating powerful, scalable, and maintainable 
              React applications that developers love to build and users love to use.
            </p>
            
            <h3>Our Values</h3>
            <div className="values-grid">
              <div className="value-item">
                <h4>Innovation</h4>
                <p>Pushing the boundaries of what's possible with React</p>
              </div>
              <div className="value-item">
                <h4>Quality</h4>
                <p>Delivering robust, tested, and well-documented solutions</p>
              </div>
              <div className="value-item">
                <h4>Community</h4>
                <p>Building and supporting a thriving developer community</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="team-content">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member">
                  <div className="member-avatar">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-bio">{member.bio}</p>
                    <div className="member-social">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <button
                          key={platform}
                          className={`social-link ${platform}`}
                          onClick={() => handleSocialClick(platform, url)}
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="timeline-content">
            <h2>Our Journey</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2020</div>
                <div className="timeline-content">
                  <h3>Framework Founded</h3>
                  <p>Started with a vision to simplify React development</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2021</div>
                <div className="timeline-content">
                  <h3>First Release</h3>
                  <p>Launched our first stable version with core features</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2022</div>
                <div className="timeline-content">
                  <h3>Community Growth</h3>
                  <p>Reached 10,000+ developers using our framework</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2023</div>
                <div className="timeline-content">
                  <h3>Enterprise Features</h3>
                  <p>Added advanced features for enterprise applications</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers building amazing applications</p>
          <div className="cta-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Start Building
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 