/**
 * Authentication Routes
 *
 * Routes for user authentication.
 */

const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  validate,
  registerValidation,
  loginValidation,
} = require("../utils/validators");

const router = express.Router();

// Register new user
router.post("/register", validate(registerValidation), authController.register);

// Login user
router.post("/login", validate(loginValidation), authController.login);

// Logout user
router.get("/logout", authController.logout);

// Password management
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch("/update-password", authController.updatePassword);

module.exports = router;
