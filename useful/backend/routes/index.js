/**
 * Routes Index
 *
 * Aggregates all API routes.
 */

const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");

const router = express.Router();

// API information route
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      products: "/api/products",
    },
  });
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
