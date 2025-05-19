/**
 * Main Server Application
 *
 * This file sets up and configures the Express server with all necessary middleware,
 * routes, and error handlers.
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./middleware/error.middleware");
const routes = require("./routes");
const config = require("./config/config");
const { connectToDatabase } = require("./config/db");

// Initialize express app
const app = express();
const PORT = config.PORT || 5000;

// Connect to database
connectToDatabase();

// Apply security middleware
app.use(helmet()); // Set security HTTP headers
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Request parsing
app.use(express.json({ limit: "10kb" })); // Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// API Routes
app.use("/api", routes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
  });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

// Handle undefined routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404;
  next(err);
});

// Global error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For testing purposes
module.exports = app;
