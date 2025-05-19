/**
 * Database Configuration
 *
 * Handles connections to either MongoDB or MySQL databases
 * based on the configuration settings.
 */

const mongoose = require("mongoose");
const mysql = require("mysql2/promise");
const config = require("./config");
const logger = require("../utils/logger");

/**
 * Connect to MongoDB database
 */
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("MongoDB connection successful");
  } catch (error) {
    logger.error("MongoDB connection error:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

/**
 * Connect to MySQL database
 */
const connectToMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
    });

    logger.info("MySQL connection successful");
    global.mysqlConnection = connection;
    return connection;
  } catch (error) {
    logger.error("MySQL connection error:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

/**
 * Connect to the appropriate database based on configuration
 */
const connectToDatabase = async () => {
  if (config.DB_TYPE === "mongodb") {
    return connectToMongoDB();
  } else if (config.DB_TYPE === "mysql") {
    return connectToMySQL();
  } else {
    logger.error("Invalid database type specified in configuration");
    process.exit(1);
  }
};

module.exports = {
  connectToDatabase,
  connectToMongoDB,
  connectToMySQL,
};
