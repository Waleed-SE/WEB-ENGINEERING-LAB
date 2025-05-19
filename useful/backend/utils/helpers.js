/**
 * Helper Functions
 *
 * Collection of common utility functions used throughout the application.
 */

/**
 * Filter out unwanted fields from an object
 * @param {Object} obj - The object to filter
 * @param {Array} allowedFields - Array of fields to keep
 * @returns {Object} - Filtered object with only allowed fields
 */
const filterObject = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/**
 * Generate a random string of specified length
 * @param {Number} length - Length of string to generate
 * @returns {String} - Random string
 */
const generateRandomString = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Format an error response object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code
 * @param {Object} additionalInfo - Any additional information to include
 * @returns {Object} - Formatted error object
 */
const formatError = (message, statusCode = 500, additionalInfo = {}) => {
  return {
    status: "error",
    statusCode,
    message,
    ...additionalInfo,
  };
};

/**
 * Format a success response object
 * @param {String} message - Success message
 * @param {Object} data - Data to include in response
 * @returns {Object} - Formatted success object
 */
const formatSuccess = (message, data = {}) => {
  return {
    status: "success",
    message,
    data,
  };
};

/**
 * Async function wrapper to handle errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  filterObject,
  generateRandomString,
  formatError,
  formatSuccess,
  catchAsync,
};
