-- MySQL Database Schema for Lab 8

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS weblab8;
USE weblab8;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Insert sample user data
INSERT INTO users (name, email, password) VALUES 
  ('John Doe', 'john@example.com', 'password123'),
  ('Jane Smith', 'jane@example.com', 'password456');

-- Optional: Insert sample product data
INSERT INTO products (name, price, description, category, stock) VALUES 
  ('Laptop', 999.99, 'High performance laptop with 16GB RAM', 'Electronics', 10),
  ('Smartphone', 599.99, 'Latest model with advanced camera', 'Electronics', 15),
  ('Headphones', 149.99, 'Wireless noise-cancelling headphones', 'Audio', 20),
  ('Backpack', 49.99, 'Durable backpack with multiple compartments', 'Accessories', 30);
