-- MySQL Database Schema for Lab 7

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS weblab7;
USE weblab7;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Optional: Insert sample data
INSERT INTO users (name, email, password) VALUES 
  ('John Doe', 'john@example.com', 'password123'),
  ('Jane Smith', 'jane@example.com', 'password456'),
  ('Bob Johnson', 'bob@example.com', 'password789');
