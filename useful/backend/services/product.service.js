/**
 * Product Service
 *
 * Handles business logic for product management.
 */

const Product = require("../models/product.model");
const AppError = require("../utils/appError");

/**
 * Get all products
 * @param {Object} queryParams - Query parameters for filtering and pagination
 * @returns {Array} - Array of products
 */
exports.getAllProducts = async (queryParams) => {
  // Build query
  let query = Product.find();

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
  const products = await query;

  return products;
};

/**
 * Get product by ID
 * @param {String} id - Product ID
 * @returns {Object} - Product object
 */
exports.getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError("No product found with that ID", 404);
  }

  return product;
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @param {String} userId - User ID creating the product
 * @returns {Object} - Created product
 */
exports.createProduct = async (productData, userId) => {
  // Add the user ID to the product data
  productData.createdBy = userId;

  const newProduct = await Product.create(productData);
  return newProduct;
};

/**
 * Update product by ID
 * @param {String} id - Product ID
 * @param {Object} productData - Product data to update
 * @returns {Object} - Updated product
 */
exports.updateProduct = async (id, productData) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new AppError("No product found with that ID", 404);
  }

  return updatedProduct;
};

/**
 * Delete product by ID
 * @param {String} id - Product ID
 * @returns {Object} - Deleted product
 */
exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError("No product found with that ID", 404);
  }

  return product;
};

/**
 * Get products by category
 * @param {String} category - Product category
 * @returns {Array} - Array of products
 */
exports.getProductsByCategory = async (category) => {
  const products = await Product.find({ category });
  return products;
};

/**
 * Get featured products
 * @param {Number} limit - Number of products to return
 * @returns {Array} - Array of featured products
 */
exports.getFeaturedProducts = async (limit = 5) => {
  const products = await Product.find({ featured: true })
    .limit(limit)
    .sort("-createdAt");

  return products;
};

/**
 * Search products
 * @param {String} keyword - Search keyword
 * @returns {Array} - Array of matching products
 */
exports.searchProducts = async (keyword) => {
  if (!keyword) {
    return [];
  }

  const regex = new RegExp(keyword, "i");

  const products = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });

  return products;
};
