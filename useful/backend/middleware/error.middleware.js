/**
 * Error Handling Middleware
 *
 * Global error handling middleware for the application.
 */

const config = require("../config/config");
const logger = require("../utils/logger");

/**
 * Format error for development environment
 * @param {Error} err - Error object
 * @returns {Object} - Formatted error response
 */
const formatErrorDev = (err) => {
  return {
    status: err.status || "error",
    statusCode: err.statusCode || 500,
    message: err.message,
    stack: err.stack,
    error: err,
  };
};

/**
 * Format error for production environment
 * @param {Error} err - Error object
 * @returns {Object} - Formatted error response
 */
const formatErrorProd = (err) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return {
      status: err.status || "error",
      statusCode: err.statusCode || 500,
      message: err.message,
    };
  }

  // Programming or other unknown error: don't leak error details
  logger.error("ERROR 💥", err);
  return {
    status: "error",
    statusCode: 500,
    message: "Something went wrong",
  };
};

/**
 * Handle JWT validation errors
 */
const handleJWTError = () => {
  const error = new Error("Invalid token. Please log in again.");
  error.statusCode = 401;
  error.isOperational = true;
  return error;
};

/**
 * Handle JWT expired errors
 */
const handleJWTExpiredError = () => {
  const error = new Error("Your token has expired. Please log in again.");
  error.statusCode = 401;
  error.isOperational = true;
  return error;
};

/**
 * Handle Mongoose validation errors
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  const error = new Error(message);
  error.statusCode = 400;
  error.isOperational = true;
  return error;
};

/**
 * Handle Mongoose duplicate key errors
 */
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  const error = new Error(message);
  error.statusCode = 400;
  error.isOperational = true;
  return error;
};

/**
 * Handle Mongoose cast errors
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  const error = new Error(message);
  error.statusCode = 400;
  error.isOperational = true;
  return error;
};

/**
 * Global error handling middleware
 */
exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error
  logger.error(`${err.statusCode} - ${err.message}`, { error: err });

  // Format error based on environment
  if (config.NODE_ENV === "development") {
    return res.status(err.statusCode).json(formatErrorDev(err));
  }

  // For production, send less details
  let error = { ...err };
  error.message = err.message;

  // Handle specific errors
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  return res.status(error.statusCode || 500).json(formatErrorProd(error));
};
