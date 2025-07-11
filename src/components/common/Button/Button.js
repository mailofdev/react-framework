/**
 * BUTTON COMPONENT
 * 
 * A reusable button component with multiple variants and states.
 * 
 * HOW IT WORKS:
 * - Supports multiple button types (primary, secondary, danger, etc.)
 * - Handles different sizes (small, medium, large)
 * - Manages loading and disabled states
 * - Provides accessibility features
 * - Supports icon placement
 * 
 * FEATURES:
 * - Multiple variants and sizes
 * - Loading state with spinner
 * - Disabled state handling
 * - Icon support (left/right)
 * - Accessibility compliant
 * - Responsive design
 * 
 * USAGE:
 * - Import and use in any component
 * - Pass variant, size, and other props
 * - Handle click events
 */

import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  // Handle button click
  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
  };

  // Generate CSS classes
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  // Render icon
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClasses = [
      'btn__icon',
      `btn__icon--${iconPosition}`
    ].join(' ');

    return (
      <span className={iconClasses}>
        {icon}
      </span>
    );
  };

  // Render loading spinner
  const renderSpinner = () => {
    if (!loading) return null;
    
    return (
      <span className="btn__spinner">
        <svg
          className="btn__spinner-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            className="btn__spinner-circle"
          />
        </svg>
      </span>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && renderSpinner()}
      {!loading && iconPosition === 'left' && renderIcon()}
      <span className="btn__content">
        {children}
      </span>
      {!loading && iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button; 