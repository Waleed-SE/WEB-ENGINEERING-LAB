import React from "react";
import "./Button.css";

/**
 * Button Component
 *
 * A customizable button component with various styles and sizes.
 *
 * @param {Object} props
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'outlined', 'text')
 * @param {string} props.size - Button size ('small', 'medium', 'large')
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {string} props.type - Button type attribute ('button', 'submit', 'reset')
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.loading - Whether the button is in loading state
 * @param {function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string|JSX.Element} props.leftIcon - Icon to display before text
 * @param {string|JSX.Element} props.rightIcon - Icon to display after text
 * @param {string|JSX.Element} props.children - Button content
 */
const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  leftIcon,
  rightIcon,
  children,
  ...rest
}) => {
  // Combine classes
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? "button-full-width" : ""} 
    ${loading ? "button-loading" : ""} 
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="button-spinner"></span>}

      {leftIcon && !loading && (
        <span className="button-icon button-icon-left">{leftIcon}</span>
      )}

      <span className="button-text">{children}</span>

      {rightIcon && !loading && (
        <span className="button-icon button-icon-right">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
