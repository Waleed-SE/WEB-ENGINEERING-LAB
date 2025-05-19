/**
 * Authentication Controller
 *
 * Handles authentication-related HTTP requests.
 */

const crypto = require("crypto");
const authService = require("../services/auth.service");
const { catchAsync, formatSuccess } = require("../utils/helpers");
const AppError = require("../utils/appError");
const config = require("../config/config");

/**
 * Register a new user
 */
exports.register = catchAsync(async (req, res, next) => {
  const user = await authService.register(req.body);

  // Create and send JWT token
  const token = authService.signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

/**
 * Login a user
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  // Create and send JWT token
  const token = authService.signToken(user._id);

  // Set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set secure cookie in production
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Remove password from output
  user.password = undefined;

  // Send JWT as cookie
  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

/**
 * Logout a user
 */
exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "logged-out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

/**
 * Update password
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;

  const user = await authService.updatePassword(
    req.user.id,
    currentPassword,
    newPassword,
    passwordConfirm
  );

  // Create and send new JWT
  const token = authService.signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    message: "Password updated successfully",
  });
});

/**
 * Forgot password
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { resetToken, user } = await authService.forgotPassword(req.body.email);

  // 2) Generate the random reset token
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    // 3) Send it to user's email
    // This would normally call an email service

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
      resetURL, // Only for development!
    });
  } catch (err) {
    // If sending email fails, reset the token and expiration
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

/**
 * Reset password
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  const user = await authService.resetPassword(
    token,
    password,
    passwordConfirm
  );

  // 3) Update changedPasswordAt property for the user
  // This is handled in the pre-save middleware in the User model

  // 4) Log the user in, send JWT
  const newToken = authService.signToken(user._id);

  res.status(200).json({
    status: "success",
    token: newToken,
    message: "Password reset successful",
  });
});
