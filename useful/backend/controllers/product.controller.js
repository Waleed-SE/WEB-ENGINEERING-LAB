/**
 * Product Controller
 *
 * Handles product-related HTTP requests.
 */

const productService = require("../services/product.service");
const { catchAsync, formatSuccess } = require("../utils/helpers");

/**
 * Get all products
 */
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await productService.getAllProducts(req.query);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * Get product by ID
 */
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

/**
 * Create a new product
 */
exports.createProduct = catchAsync(async (req, res, next) => {
  // Add the current user as the creator
  const newProduct = await productService.createProduct(req.body, req.user.id);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

/**
 * Update product by ID
 */
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await productService.updateProduct(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

/**
 * Delete product by ID
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

/**
 * Get products by category
 */
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const products = await productService.getProductsByCategory(
    req.params.category
  );

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * Get featured products
 */
exports.getFeaturedProducts = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 5;
  const products = await productService.getFeaturedProducts(limit);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * Search products
 */
exports.searchProducts = catchAsync(async (req, res, next) => {
  const products = await productService.searchProducts(req.query.keyword);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
