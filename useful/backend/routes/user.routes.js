/**
 * User Routes
 *
 * Routes for user management.
 */

const express = require("express");
const userController = require("../controllers/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Current user routes
router.use(protect); // All routes below this middleware require authentication

router.get("/me", userController.getMe, userController.getUser);
router.patch("/update-me", userController.updateMe);
router.delete("/delete-me", userController.deleteMe);

// Admin routes for user management
router.use(restrictTo("admin")); // All routes below this middleware require admin role

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
