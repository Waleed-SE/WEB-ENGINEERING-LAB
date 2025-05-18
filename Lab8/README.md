# Lab 8: Full-Stack Web Development with Node.js and AJAX

This lab focuses on creating a full-stack web application with a Node.js backend, MySQL database, and frontend that communicates via AJAX requests.

## Contents

- `lab8.js`: Main Express server file implementing REST API endpoints for product management
- `lab8.html`: Frontend interface for product inventory management
- `login.html`: User authentication page
- `register.html`: User registration page
- `package.json`: Dependencies and project configuration

## Topics Covered

- Full-stack JavaScript application development
- AJAX requests for asynchronous data fetching
- REST API implementation
- User authentication (register/login)
- Product inventory management
- MySQL database interaction
- CORS handling
- Express.js middleware
- Client-side form handling and validation

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- MySQL Server
- npm (Node Package Manager)

### Database Setup

1. Create a MySQL database named `weblab8`
2. Update the database connection configuration in `lab8.js` if needed:
   ```javascript
   const connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "12345678",
     database: "weblab8",
   });
   ```
3. Create the database schema using the provided SQL file:

   ```
   mysql -u root -p < database_schema.sql
   ```

   Or manually create the database with these tables:

   ```sql
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
   ```

4. Alternatively, import the SQL file `F223674_L8.sql` to set up the database:
   ```
   mysql -u root -p weblab8 < F223674_L8.sql
   ```

### Installation

1. Navigate to the Lab8 directory:
   ```
   cd Lab8
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```
2. The server will run on port 4000
3. Open `lab8.html`, `login.html`, or `register.html` in a web browser
   - You may need to serve these HTML files using a simple HTTP server or open them directly

## Features

### Backend API

- User registration and authentication
- CRUD operations for product management
- Data validation and error handling

### Frontend

- Product inventory management interface
- User registration and login forms
- AJAX communication with the backend
- Dynamic content rendering
- Form validation

## Learning Objectives

- Build a complete full-stack JavaScript application
- Implement AJAX for asynchronous communication
- Create and consume RESTful APIs
- Handle user authentication
- Implement CRUD operations
- Apply proper error handling
- Understand client-server architecture
