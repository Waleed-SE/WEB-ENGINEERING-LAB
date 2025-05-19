/**
 * User Service
 *
 * Handles business logic for user management.
 */

const User = require("../models/user.model");
const { filterObject } = require("../utils/helpers");
const AppError = require("../utils/appError");

/**
 * Get all users
 * @param {Object} queryParams - Query parameters for filtering and pagination
 * @returns {Array} - Array of users
 */
exports.getAllUsers = async (queryParams) => {
  // Build query
  let query = User.find();

  // Filtering
  const queryObj = { ...queryParams };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  query = query.find(JSON.parse(queryStr));

  // Sorting
  if (queryParams.sort) {
    const sortBy = queryParams.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Field limiting
  if (queryParams.fields) {
    const fields = queryParams.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // Pagination
  const page = queryParams.page * 1 || 1;
  const limit = queryParams.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const users = await query;

  return users;
};

/**
 * Get user by ID
 * @param {String} id - User ID
 * @returns {Object} - User object
 */
exports.getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("No user found with that ID", 404);
  }

  return user;
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Object} - Created user
 */
exports.createUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

/**
 * Update user by ID
 * @param {String} id - User ID
 * @param {Object} userData - User data to update
 * @returns {Object} - Updated user
 */
exports.updateUser = async (id, userData) => {
  // 1) Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObject(userData, ["name", "email", "role"]);

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError("No user found with that ID", 404);
  }

  return updatedUser;
};

/**
 * Delete user by ID
 * @param {String} id - User ID
 * @returns {Object} - Deleted user
 */
exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError("No user found with that ID", 404);
  }

  return user;
};

/**
 * Update current user profile
 * @param {String} id - User ID
 * @param {Object} userData - User data to update
 * @returns {Object} - Updated user
 */
exports.updateMe = async (id, userData) => {
  // 1) Create error if user tries to update password
  if (userData.password || userData.passwordConfirm) {
    throw new AppError(
      "This route is not for password updates. Please use /updateMyPassword.",
      400
    );
  }

  // 2) Filter out unwanted fields that are not allowed to be updated
  const filteredBody = filterObject(userData, ["name", "email"]);

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

/**
 * Delete current user (set inactive)
 * @param {String} id - User ID
 */
exports.deleteMe = async (id) => {
  await User.findByIdAndUpdate(id, { active: false });
};
