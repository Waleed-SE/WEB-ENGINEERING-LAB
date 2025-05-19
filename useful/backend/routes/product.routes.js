/**
 * Product Routes
 *
 * Routes for product management.
 */

const express = require("express");
const productController = require("../controllers/product.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const {
  validate,
  productValidation,
  idParamValidation,
} = require("../utils/validators");

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/featured", productController.getFeaturedProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", validate(idParamValidation), productController.getProduct);

// Protected routes
router.use(protect); // All routes below this middleware require authentication

// Only admins can create, update, or delete products
router.use(restrictTo("admin"));

router.post("/", validate(productValidation), productController.createProduct);

router
  .route("/:id")
  .patch(validate(productValidation), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
