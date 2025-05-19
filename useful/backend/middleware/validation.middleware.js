/**
 * Validation Middleware
 *
 * Middleware for validating request data.
 */

const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

/**
 * Validate request data using express-validator
 */
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return next(new AppError(`Validation error: ${messages.join(", ")}`, 400));
  }
  next();
};
