/**
 * Authentication Service
 *
 * Handles user authentication logic, including login, registration,
 * token generation, and password reset functionality.
 */

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");
const config = require("../config/config");
const AppError = require("../utils/appError");

/**
 * Sign JWT token
 * @param {String} id - User ID
 * @returns {String} - JWT token
 */
const signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

/**
 * Create and send JWT token response
 * @param {Object} user - User object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  // Set JWT cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set secure cookie in production
  if (config.NODE_ENV === "production") cookieOptions.secure = true;

  // Send cookie
  res.cookie("jwt", token, cookieOptions);

  // Send response
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

/**
 * Register a new user
 * @param {Object} userData - User data for registration
 * @returns {Object} - Registered user
 */
exports.register = async (userData) => {
  // 1) Check if a user with this email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  // 2) Create the user
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    passwordConfirm: userData.passwordConfirm,
    role: userData.role || "user",
  });

  return user;
};

/**
 * Log in a user
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} - Logged in user
 */
exports.login = async (email, password) => {
  // 1) Check if email and password exist
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  // 3) Return user
  return user;
};

/**
 * Update user password
 * @param {String} userId - User ID
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 * @param {String} passwordConfirm - Password confirmation
 * @returns {Object} - Updated user
 */
exports.updatePassword = async (
  userId,
  currentPassword,
  newPassword,
  passwordConfirm
) => {
  // 1) Get user from database
  const user = await User.findById(userId).select("+password");

  // 2) Check if posted current password is correct
  if (!(await user.correctPassword(currentPassword, user.password))) {
    throw new AppError("Your current password is incorrect", 401);
  }

  // 3) If so, update password
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 4) Return updated user
  return user;
};

/**
 * Generate password reset token
 * @param {String} email - User email
 * @returns {Object} - Reset token and user
 */
exports.forgotPassword = async (email) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("There is no user with that email address", 404);
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Return the token
  return {
    resetToken,
    user,
  };
};

/**
 * Reset password using token
 * @param {String} token - Reset token
 * @param {String} password - New password
 * @param {String} passwordConfirm - Password confirmation
 * @returns {Object} - Updated user
 */
exports.resetPassword = async (token, password, passwordConfirm) => {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    throw new AppError("Token is invalid or has expired", 400);
  }

  // 3) Update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Return updated user
  return user;
};

/**
 * Verify JWT token
 * @param {String} token - JWT token
 * @returns {Object} - Decoded token payload
 */
exports.verifyToken = async (token) => {
  return await jwt.verify(token, config.JWT_SECRET);
};
