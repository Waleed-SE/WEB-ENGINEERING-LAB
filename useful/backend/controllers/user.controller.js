/**
 * User Controller
 *
 * Handles user-related HTTP requests.
 */

const userService = require("../services/user.service");
const { catchAsync, formatSuccess } = require("../utils/helpers");

/**
 * Get all users
 */
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

/**
 * Get user by ID
 */
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

/**
 * Create a new user
 */
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await userService.createUser(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

/**
 * Update user by ID
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * Delete user by ID
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

/**
 * Get current user profile
 */
exports.getMe = catchAsync(async (req, res, next) => {
  // Set the user ID from the authenticated user
  req.params.id = req.user.id;
  next();
});

/**
 * Update current user profile
 */
exports.updateMe = catchAsync(async (req, res, next) => {
  const updatedUser = await userService.updateMe(req.user.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * Delete current user (set inactive)
 */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await userService.deleteMe(req.user.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
