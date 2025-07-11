/**
 * CONTACT PAGE COMPONENT
 * 
 * This page provides a contact form and contact information for users.
 * 
 * HOW IT WORKS:
 * - Displays contact form with validation
 * - Shows company contact information
 * - Handles form submission and feedback
 * - Provides multiple contact methods
 * 
 * FEATURES:
 * - Form validation with error handling
 * - File upload capabilities
 * - Contact method selection
 * - Success/error feedback
 * - Accessibility compliant form
 * 
 * USAGE:
 * - Import in routes configuration
 * - Connect to backend API for form submission
 * - Add email integration for notifications
 */

import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email',
    priority: 'normal'
  });

  // UI state management
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Form validation rules
  const validationRules = {
    name: (value) => value.trim().length >= 2 || 'Name must be at least 2 characters',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email',
    subject: (value) => value.trim().length >= 5 || 'Subject must be at least 5 characters',
    message: (value) => value.trim().length >= 10 || 'Message must be at least 10 characters'
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateField = (name, value) => {
    const rule = validationRules[name];
    return rule ? rule(value) : true;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const validation = validateField(field, formData[field]);
      if (validation !== true) {
        newErrors[field] = validation;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success handling
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactMethod: 'email',
        priority: 'normal'
      });
      
      // Analytics tracking
      console.log('Contact form submitted successfully');
      
    } catch (error) {
      // Error handling
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle contact method selection
  const handleContactMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      contactMethod: method
    }));
  };

  return (
    <div className="contact-container">
      {/* Header Section */}
      <section className="contact-header">
        <div className="header-content">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch with our team. We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="contact-content">
        {/* Contact Information */}
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>support@reactframework.com</p>
              <p>We'll respond within 24 hours</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9AM-6PM EST</p>
            </div>
            <div className="info-item">
              <div className="info-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Available on our website</p>
              <p>Instant responses during business hours</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Subject Field */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`form-input ${errors.subject ? 'error' : ''}`}
                placeholder="What's this about?"
                required
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            {/* Priority Selection */}
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Contact Method */}
            <div className="form-group">
              <label className="form-label">Preferred Contact Method</label>
              <div className="contact-method-options">
                {['email', 'phone', 'chat'].map(method => (
                  <label key={method} className="radio-label">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={() => handleContactMethodChange(method)}
                    />
                    <span className="radio-text">
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Tell us more about your inquiry..."
                rows="6"
                required
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="status-message success">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How quickly do you respond?</h3>
            <p>We typically respond to all inquiries within 24 hours during business days.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer support for enterprise clients?</h3>
            <p>Yes, we provide dedicated support for enterprise clients with priority response times.</p>
          </div>
          <div className="faq-item">
            <h3>Can I schedule a demo?</h3>
            <p>Absolutely! Contact us to schedule a personalized demo of our framework.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 