/**
 * Application Configuration
 *
 * Centralizes all configuration variables and environment settings.
 * Uses dotenv to load environment variables from .env file.
 */

require("dotenv").config();

const config = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",

  // Database configuration
  DB_TYPE: process.env.DB_TYPE || "mongodb", // 'mongodb' or 'mysql'

  // MongoDB configuration
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/webengineering",

  // MySQL configuration
  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "webengineering",

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 1,

  // Email configuration (if needed)
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,

  // Logging configuration
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

module.exports = config;
