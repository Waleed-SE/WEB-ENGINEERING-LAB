import React, { useState } from "react";
import "./FormElements.css";

/**
 * Text Input Component
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.id - Input id attribute
 * @param {string} props.name - Input name attribute
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Whether the input is required
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text to display below input
 * @param {string} props.className - Additional CSS classes
 */
export const TextInput = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  const inputClasses = `
    form-input 
    ${hasError ? "form-input-error" : ""} 
    ${focused ? "form-input-focused" : ""} 
    ${className}
  `;

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${id}-helper-text` : undefined}
        {...rest}
      />

      {(helperText || error) && (
        <p
          id={`${id}-helper-text`}
          className={`form-helper-text ${hasError ? "form-error-text" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea Component
 *
 * @param {Object} props
 * @param {string} props.label - Textarea label
 * @param {string} props.id - Textarea id attribute
 * @param {string} props.name - Textarea name attribute
 * @param {string} props.value - Textarea value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.placeholder - Textarea placeholder
 * @param {boolean} props.required - Whether the textarea is required
 * @param {boolean} props.disabled - Whether the textarea is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text to display below textarea
 * @param {number} props.rows - Number of rows to display
 * @param {string} props.className - Additional CSS classes
 */
export const TextArea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  rows = 4,
  className = "",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  const textareaClasses = `
    form-textarea 
    ${hasError ? "form-input-error" : ""} 
    ${focused ? "form-input-focused" : ""} 
    ${className}
  `;

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={textareaClasses}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${id}-helper-text` : undefined}
        {...rest}
      />

      {(helperText || error) && (
        <p
          id={`${id}-helper-text`}
          className={`form-helper-text ${hasError ? "form-error-text" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Select Component
 *
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {string} props.id - Select id attribute
 * @param {string} props.name - Select name attribute
 * @param {string} props.value - Select value
 * @param {function} props.onChange - Change handler function
 * @param {Array} props.options - Array of option objects with value and label properties
 * @param {string} props.placeholder - Select placeholder (first option)
 * @param {boolean} props.required - Whether the select is required
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text to display below select
 * @param {string} props.className - Additional CSS classes
 */
export const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  const selectClasses = `
    form-select 
    ${hasError ? "form-input-error" : ""} 
    ${focused ? "form-input-focused" : ""} 
    ${className}
  `;

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={selectClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={hasError}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(helperText || error) && (
        <p
          id={`${id}-helper-text`}
          className={`form-helper-text ${hasError ? "form-error-text" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Checkbox Component
 *
 * @param {Object} props
 * @param {string} props.label - Checkbox label
 * @param {string} props.id - Checkbox id attribute
 * @param {string} props.name - Checkbox name attribute
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onChange - Change handler function
 * @param {boolean} props.required - Whether the checkbox is required
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text to display below checkbox
 * @param {string} props.className - Additional CSS classes
 */
export const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
  ...rest
}) => {
  const hasError = !!error;

  const checkboxClasses = `
    form-checkbox 
    ${hasError ? "form-checkbox-error" : ""} 
    ${className}
  `;

  return (
    <div className="form-control-inline">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={checkboxClasses}
          aria-invalid={hasError}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          {...rest}
        />

        <label htmlFor={id} className="checkbox-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      </div>

      {(helperText || error) && (
        <p
          id={`${id}-helper-text`}
          className={`form-helper-text ${hasError ? "form-error-text" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Radio Button Component
 *
 * @param {Object} props
 * @param {string} props.label - Radio group label
 * @param {string} props.name - Radio group name attribute
 * @param {string} props.value - Currently selected radio value
 * @param {function} props.onChange - Change handler function
 * @param {Array} props.options - Array of option objects with value and label properties
 * @param {boolean} props.required - Whether the radio group is required
 * @param {boolean} props.disabled - Whether all radio buttons are disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text to display below radio group
 * @param {string} props.className - Additional CSS classes
 */
export const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
  ...rest
}) => {
  const hasError = !!error;

  const radioGroupClasses = `
    form-radio-group 
    ${hasError ? "form-radio-group-error" : ""} 
    ${className}
  `;

  return (
    <div className="form-control">
      {label && (
        <div className="form-label radio-group-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </div>
      )}

      <div
        className={radioGroupClasses}
        role="radiogroup"
        aria-labelledby={`${name}-group-label`}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${name}-helper-text` : undefined}
        {...rest}
      >
        {options.map((option) => (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
              disabled={disabled || option.disabled}
              className="form-radio"
            />
            <label htmlFor={`${name}-${option.value}`} className="radio-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {(helperText || error) && (
        <p
          id={`${name}-helper-text`}
          className={`form-helper-text ${hasError ? "form-error-text" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Form Component
 *
 * @param {Object} props
 * @param {function} props.onSubmit - Form submit handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.children - Form child elements
 */
export const Form = ({ onSubmit, className = "", children, ...rest }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const formClasses = `form ${className}`;

  return (
    <form className={formClasses} onSubmit={handleSubmit} noValidate {...rest}>
      {children}
    </form>
  );
};

export default {
  Form,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
};
