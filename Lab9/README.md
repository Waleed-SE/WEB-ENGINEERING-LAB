# Lab 9: Full-Stack MERN Applications

This lab focuses on building full-stack web applications using the MERN stack (MongoDB, Express.js, React/vanilla JS, Node.js) with various functionalities.

## Contents

### Task1: Student Registration System

- `server.js`: Express server with MongoDB connection
- `Task1.html`, `Task1.css`, `Task1.js`: Frontend for student registration
- `Model/Student.js`: Mongoose model for student data
- `Students.json`: Sample data

### Task2: Product Management System

- `server.js`: Express server with MongoDB connection
- `Task2.html`, `Task2.css`, `Task2.js`: Frontend for product management
- `Model/Product.js`: Mongoose model for product data
- `Products.json`: Sample product data

### Task3: Custom Application

- `server.js`: Express server with MongoDB connection
- `Task3.html`, `Task3.css`, `Task3.js`: Frontend interface
- `Model/`: MongoDB models

### Task4: Job Application Portal

- `server.js`: Express server with MongoDB connection
- `Jobs.json`, `Applicant.json`: Sample data for jobs and applicants
- Frontend files for job listing and application

### Task5-7: Additional MERN stack applications

### Bonus Task

- `server.js`: Express server with advanced functionality
- `Bonus.html`, `Bonus.css`, `Bonus.js`: Frontend interface
- `Model/`: MongoDB models for the bonus application

## Topics Covered

- MongoDB database with Mongoose ODM
- RESTful API development with Express.js
- Single-page application frontend development
- Form validation and data processing
- AJAX communication between frontend and backend
- CRUD operations with MongoDB
- Authentication and authorization
- Data modeling with Mongoose schemas
- Error handling in full-stack applications

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (v4.4 or newer)
- npm (Node Package Manager)

### MongoDB Setup

1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   ```
   mongod --dbpath="C:\data\db"
   ```
3. MongoDB will be available at `mongodb://localhost:27017`
4. The database will be created automatically when the server connects to MongoDB
5. Reference schema structures are available in the `database_schema.js` file
6. Sample data to import:
   ```
   mongoimport --db WebLab9 --collection students --file Students.json --jsonArray
   mongoimport --db WebLab9 --collection products --file Products.json --jsonArray
   mongoimport --db WebLab9 --collection jobs --file Jobs.json --jsonArray
   mongoimport --db WebLab9 --collection applicants --file Applicant.json --jsonArray
   ```

### Installation (for each task)

1. Navigate to the task directory (e.g., Task1, Task2, etc.):
   ```
   cd Lab9/Task1
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Running the Applications

1. Start the server:
   ```
   npm start
   ```
2. The server will run on port 5000
3. Open the corresponding HTML file (e.g., `Task1.html`) in a web browser

## Task Details

### Task1: Student Registration System

- Register students with name, email, password, and department
- Check for email uniqueness
- Store student data in MongoDB

### Task2: Product Management System

- Create, read, update, and delete products
- Product listing with search and filter functionality
- Responsive design for various screen sizes

### Task3: Custom Application

- Custom application with specific requirements
- MongoDB data models and Express routes
- Frontend interface with interactive features

### Task4: Job Application Portal

- List job openings
- Allow users to apply for jobs
- Track application status
- Admin interface for managing applications

### Additional Tasks

Each task focuses on different aspects of full-stack development with MongoDB, Express, and Node.js.

## Learning Objectives

- Build complete full-stack applications with MongoDB
- Implement proper data modeling with Mongoose
- Create RESTful APIs with Express.js
- Develop interactive frontend interfaces
- Understand the complete request-response cycle
- Implement proper error handling and validation
- Apply best practices for MongoDB/Mongoose usage
