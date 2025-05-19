/**
 * MongoDB Connection and Setup
 * This file provides utility functions for connecting to MongoDB
 * and setting up collections for the Web Engineering Lab database.
 */

const mongoose = require("mongoose");

// Configuration
const DB_NAME = "weblab_database";
const DB_HOST = "localhost";
const DB_PORT = 27017;
const MONGODB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/**
 * Connect to MongoDB
 * @returns {Promise} Mongoose connection
 */
async function connectToMongoDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

/**
 * Create Student Schema
 * @returns {mongoose.Schema} Student Schema
 */
function createStudentSchema() {
  const studentSchema = new mongoose.Schema({
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model("Student", studentSchema);
}

/**
 * Create Product Schema
 * @returns {mongoose.Schema} Product Schema
 */
function createProductSchema() {
  const productSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  });

  return mongoose.model("Product", productSchema);
}

/**
 * Create User Schema (for authentication)
 * @returns {mongoose.Schema} User Schema
 */
function createUserSchema() {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model("User", userSchema);
}

/**
 * Initialize Database with sample data
 * @param {mongoose.Model} Student - Student model
 * @param {mongoose.Model} Product - Product model
 * @param {mongoose.Model} User - User model
 */
async function initializeDatabase(Student, Product, User) {
  try {
    // Check if collections are empty before adding sample data
    const studentCount = await Student.countDocuments();
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();

    // Add sample students if collection is empty
    if (studentCount === 0) {
      console.log("Adding sample students...");
      await Student.insertMany([
        {
          studentId: "S001",
          name: "John Doe",
          email: "john.doe@example.com",
          course: "Web Engineering",
        },
        {
          studentId: "S002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          course: "Database Management",
        },
        {
          studentId: "S003",
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          course: "Mobile App Development",
        },
      ]);
    }

    // Add sample products if collection is empty
    if (productCount === 0) {
      console.log("Adding sample products...");
      await Product.insertMany([
        {
          productId: "P001",
          name: "Laptop",
          price: 999.99,
          description: "High-performance laptop for developers",
          category: "Electronics",
          inStock: true,
        },
        {
          productId: "P002",
          name: "Smartphone",
          price: 499.99,
          description: "Latest smartphone with advanced features",
          category: "Electronics",
          inStock: true,
        },
        {
          productId: "P003",
          name: "Headphones",
          price: 129.99,
          description: "Noise-cancelling wireless headphones",
          category: "Accessories",
          inStock: false,
        },
      ]);
    }

    // Add sample users if collection is empty
    if (userCount === 0) {
      console.log("Adding sample users...");
      // In a real application, passwords should be hashed
      await User.insertMany([
        {
          username: "user1",
          email: "user1@example.com",
          password: "password123",
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: "password456",
        },
      ]);
    }

    console.log("Database initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

/**
 * Main function to set up MongoDB
 */
async function setupMongoDB() {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Create models
    const Student = createStudentSchema();
    const Product = createProductSchema();
    const User = createUserSchema();

    // Initialize database with sample data
    await initializeDatabase(Student, Product, User);

    console.log("MongoDB setup completed successfully!");
    return {
      connection: db,
      models: {
        Student,
        Product,
        User,
      },
    };
  } catch (error) {
    console.error("MongoDB setup failed:", error);
    throw error;
  }
}

// Export functions and models
module.exports = {
  connectToMongoDB,
  setupMongoDB,
  createStudentSchema,
  createProductSchema,
  createUserSchema,
};

// Example usage in another file:
/*
const { setupMongoDB } = require('./mongodb_connection');

async function main() {
  try {
    const { connection, models } = await setupMongoDB();
    const { Student, Product, User } = models;
    
    // Now you can use the models to interact with the database
    const students = await Student.find();
    console.log('Students:', students);
    
    // Close connection when done
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
*/
