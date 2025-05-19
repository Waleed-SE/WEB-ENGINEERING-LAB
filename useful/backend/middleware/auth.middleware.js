/**
 * Authentication Middleware
 *
 * Middleware for authenticating users and protecting routes.
 */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const config = require("../config/config");
const User = require("../models/user.model");
const { formatError } = require("../utils/helpers");

/**
 * Protect routes - only authenticated users can access
 */
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res
        .status(401)
        .json(
          formatError(
            "You are not logged in. Please log in to get access.",
            401
          )
        );
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json(
          formatError("The user belonging to this token no longer exists.", 401)
        );
    }

    // 4) Check if user changed password after the token was issued
    if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
      return res
        .status(401)
        .json(
          formatError(
            "User recently changed password. Please log in again.",
            401
          )
        );
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(formatError("Authentication failed. Please log in again.", 401));
  }
};

/**
 * Restrict access to certain roles
 * @param  {...String} roles - Allowed roles
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(
          formatError("You do not have permission to perform this action", 403)
        );
    }
    next();
  };
};
