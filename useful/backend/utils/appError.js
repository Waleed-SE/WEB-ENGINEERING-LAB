/**
 * Application Error Class
 *
 * Custom error class for operational errors.
 */

class AppError extends Error {
  /**
   * Create a new AppError
   * @param {String} message - Error message
   * @param {Number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
