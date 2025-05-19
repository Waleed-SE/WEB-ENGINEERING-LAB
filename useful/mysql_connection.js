/**
 * MySQL Connection and Setup
 * This file provides utility functions for connecting to MySQL
 * and setting up tables for the Web Engineering Lab database.
 */

const mysql = require("mysql2/promise");

// MySQL Connection Configuration
const DB_CONFIG = {
  host: "localhost",
  user: "root", // Default MySQL user, change as needed
  password: "", // Default password is empty, change as needed
  port: 3306, // Default MySQL port
};

// Database name
const DB_NAME = "weblab_database";

/**
 * Connect to MySQL server
 * @returns {Promise<mysql.Connection>} MySQL connection object
 */
async function connectToMySQL() {
  try {
    // Connect to MySQL server without specifying database
    const connection = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      port: DB_CONFIG.port,
    });

    console.log("Connected to MySQL server successfully!");
    return connection;
  } catch (error) {
    console.error("MySQL connection error:", error);
    throw error;
  }
}

/**
 * Create database if it doesn't exist
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<mysql.Connection>} New connection with database selected
 */
async function createDatabase(connection) {
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database '${DB_NAME}' created or already exists.`);

    // Close the connection without database
    await connection.end();

    // Create a new connection with the database selected
    const dbConnection = await mysql.createConnection({
      ...DB_CONFIG,
      database: DB_NAME,
    });

    console.log(`Connected to database '${DB_NAME}'.`);
    return dbConnection;
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
}

/**
 * Create Students table
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function createStudentsTable(connection) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        course VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(query);
    console.log("Students table created or already exists.");
  } catch (error) {
    console.error("Error creating Students table:", error);
    throw error;
  }
}

/**
 * Create Products table
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function createProductsTable(connection) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        in_stock BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(query);
    console.log("Products table created or already exists.");
  } catch (error) {
    console.error("Error creating Products table:", error);
    throw error;
  }
}

/**
 * Create Users table (for authentication)
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function createUsersTable(connection) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(query);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating Users table:", error);
    throw error;
  }
}

/**
 * Create Orders table with foreign key to Products
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function createOrdersTable(connection) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(10) UNIQUE NOT NULL,
        user_id INT,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `;

    await connection.execute(query);
    console.log("Orders table created or already exists.");
  } catch (error) {
    console.error("Error creating Orders table:", error);
    throw error;
  }
}

/**
 * Create Order_Items table with foreign keys
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function createOrderItemsTable(connection) {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    await connection.execute(query);
    console.log("Order_Items table created or already exists.");
  } catch (error) {
    console.error("Error creating Order_Items table:", error);
    throw error;
  }
}

/**
 * Insert sample data into tables
 * @param {mysql.Connection} connection - MySQL connection object
 * @returns {Promise<void>}
 */
async function insertSampleData(connection) {
  try {
    // Check if tables have data
    const [studentRows] = await connection.execute(
      "SELECT COUNT(*) as count FROM students"
    );
    const [productRows] = await connection.execute(
      "SELECT COUNT(*) as count FROM products"
    );
    const [userRows] = await connection.execute(
      "SELECT COUNT(*) as count FROM users"
    );

    // Insert sample students if table is empty
    if (studentRows[0].count === 0) {
      const studentsQuery = `
        INSERT INTO students (student_id, name, email, course) VALUES
        ('S001', 'John Doe', 'john.doe@example.com', 'Web Engineering'),
        ('S002', 'Jane Smith', 'jane.smith@example.com', 'Database Management'),
        ('S003', 'Alex Johnson', 'alex.johnson@example.com', 'Mobile App Development')
      `;

      await connection.execute(studentsQuery);
      console.log("Sample students data inserted.");
    }

    // Insert sample products if table is empty
    if (productRows[0].count === 0) {
      const productsQuery = `
        INSERT INTO products (product_id, name, price, description, category, in_stock) VALUES
        ('P001', 'Laptop', 999.99, 'High-performance laptop for developers', 'Electronics', TRUE),
        ('P002', 'Smartphone', 499.99, 'Latest smartphone with advanced features', 'Electronics', TRUE),
        ('P003', 'Headphones', 129.99, 'Noise-cancelling wireless headphones', 'Accessories', FALSE)
      `;

      await connection.execute(productsQuery);
      console.log("Sample products data inserted.");
    }

    // Insert sample users if table is empty
    if (userRows[0].count === 0) {
      // In a real application, passwords should be hashed
      const usersQuery = `
        INSERT INTO users (username, email, password) VALUES
        ('user1', 'user1@example.com', 'password123'),
        ('user2', 'user2@example.com', 'password456')
      `;

      await connection.execute(usersQuery);
      console.log("Sample users data inserted.");

      // Get user IDs for orders
      const [users] = await connection.execute("SELECT id FROM users");

      // Insert sample orders
      const ordersQuery = `
        INSERT INTO orders (order_id, user_id, total_amount, status) VALUES
        ('O001', ${users[0].id}, 1499.98, 'shipped'),
        ('O002', ${users[1].id}, 129.99, 'delivered')
      `;

      await connection.execute(ordersQuery);
      console.log("Sample orders data inserted.");

      // Get order IDs and product IDs for order items
      const [orders] = await connection.execute("SELECT id FROM orders");
      const [products] = await connection.execute("SELECT id FROM products");

      // Insert sample order items
      const orderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
        (${orders[0].id}, ${products[0].id}, 1, 999.99),
        (${orders[0].id}, ${products[1].id}, 1, 499.99),
        (${orders[1].id}, ${products[2].id}, 1, 129.99)
      `;

      await connection.execute(orderItemsQuery);
      console.log("Sample order items data inserted.");
    }

    console.log("Sample data insertion completed.");
  } catch (error) {
    console.error("Error inserting sample data:", error);
    throw error;
  }
}

/**
 * Setup MySQL database and tables
 * @returns {Promise<mysql.Connection>} MySQL connection object
 */
async function setupMySQL() {
  let connection = null;

  try {
    // Connect to MySQL server
    connection = await connectToMySQL();

    // Create database
    connection = await createDatabase(connection);

    // Create tables
    await createStudentsTable(connection);
    await createProductsTable(connection);
    await createUsersTable(connection);
    await createOrdersTable(connection);
    await createOrderItemsTable(connection);

    // Insert sample data
    await insertSampleData(connection);

    console.log("MySQL setup completed successfully!");
    return connection;
  } catch (error) {
    console.error("MySQL setup failed:", error);
    if (connection) {
      await connection.end();
    }
    throw error;
  }
}

/**
 * Query execution helper function
 * @param {mysql.Connection} connection - MySQL connection object
 * @param {string} sql - SQL query to execute
 * @param {Array} params - Parameters for the query
 * @returns {Promise<Array>} Query results
 */
async function executeQuery(connection, sql, params = []) {
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

// Export functions
module.exports = {
  connectToMySQL,
  setupMySQL,
  executeQuery,
  DB_NAME,
};

// Example usage in another file:
/*
const { setupMySQL, executeQuery } = require('./mysql_connection');

async function main() {
  try {
    // Setup MySQL database and get connection
    const connection = await setupMySQL();
    
    // Example query
    const students = await executeQuery(connection, 'SELECT * FROM students');
    console.log('Students:', students);
    
    // Close connection when done
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
*/
