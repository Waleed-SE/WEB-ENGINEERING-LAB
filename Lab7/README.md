# Lab 7: Node.js and Express Introduction

This lab introduces server-side JavaScript using Node.js and Express framework, focusing on building RESTful APIs and connecting to MySQL databases.

## Contents

### Task1

- `task1.js`: Main Express server file implementing REST API endpoints
- `package.json`: Dependencies and project configuration

### Task2

- Empty folder structure for additional tasks

## Topics Covered

- Node.js fundamentals
- Express.js framework setup
- RESTful API development
- MySQL database connection and queries
- HTTP methods (GET, POST, PUT)
- Request and response handling
- API endpoint design
- Body parsing and form data handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- MySQL Server
- npm (Node Package Manager)

### Database Setup

1. Create a MySQL database named `weblab7`
2. Update the database connection configuration in `task1.js` if needed:
   ```javascript
   const connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "12345678",
     database: "weblab7",
   });
   ```
3. Create the database schema using the provided SQL file:

   ```
   mysql -u root -p < database_schema.sql
   ```

   Or manually create a `users` table with the following structure:

   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(100) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Installation

1. Navigate to the Task1 directory:
   ```
   cd Lab7/Task1
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Running the Server

1. Start the server:
   ```
   npm start
   ```
2. The server will run on default port (typically port 3000)
3. Access the API endpoints through a web browser or tools like Postman

## API Endpoints

- `GET /`: Simple hello world response
- `POST /insert`: Insert a new user into the database
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user by ID
- `PUT /api/users/:id`: Update a user's name by ID

## Learning Objectives

- Set up a Node.js and Express environment
- Create RESTful API endpoints
- Connect to and query a MySQL database
- Handle HTTP requests and responses
- Parse request bodies and form data
- Implement CRUD operations through an API
- Understand server-side JavaScript concepts
