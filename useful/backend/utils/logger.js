/**
 * Logger Utility
 *
 * Provides consistent logging throughout the application.
 * Uses winston for advanced logging capabilities.
 */

const winston = require("winston");
const config = require("../config/config");

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: logFormat,
  defaultMeta: { service: "web-engineering-api" },
  transports: [
    // Write to all logs with level 'info' and below to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ filename: "error.log", level: "error" }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// If we're not in production, log to the console with a simpler format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// Create a stream object for morgan middleware
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
