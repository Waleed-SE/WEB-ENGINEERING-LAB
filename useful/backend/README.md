# Backend API Structure

This directory contains a complete Node.js/Express backend API structure following modern architectural patterns. The codebase is organized using the Model-View-Controller (MVC) pattern with an additional Service layer for better separation of concerns.

## Project Structure

```
backend/
│
├── server.js               # Main application entry point
├── package.json            # Project dependencies and scripts
│
├── config/                 # Configuration files
│   ├── db.js               # Database connection (MongoDB and MySQL)
│   └── config.js           # Environment configuration
│
├── routes/                 # API route definitions
│   ├── index.js            # Routes aggregator
│   ├── auth.routes.js      # Authentication routes
│   ├── user.routes.js      # User management routes
│   └── product.routes.js   # Product management routes
│
├── controllers/            # Request handlers
│   ├── auth.controller.js  # Authentication controllers
│   ├── user.controller.js  # User CRUD operations
│   └── product.controller.js # Product CRUD operations
│
├── services/               # Business logic
│   ├── auth.service.js     # Authentication service functions
│   ├── user.service.js     # User service functions
│   └── product.service.js  # Product service functions
│
├── models/                 # Data models
│   ├── user.model.js       # User model
│   └── product.model.js    # Product model
│
├── middleware/             # Custom middleware functions
│   ├── auth.middleware.js  # JWT authentication middleware
│   ├── error.middleware.js # Error handling middleware
│   └── validation.middleware.js # Request validation middleware
│
├── utils/                  # Utility functions
│   ├── logger.js           # Logging utility
│   ├── validators.js       # Input validation functions
│   ├── helpers.js          # General helper functions
│   └── appError.js         # Custom error class
│
└── tests/                  # Test files (to be implemented)
```

## Features

- **Authentication**: Complete JWT-based authentication with refresh tokens
- **Authorization**: Role-based access control
- **Error Handling**: Centralized error handling with proper status codes
- **Validation**: Request data validation
- **Logging**: Structured logging with Winston
- **Database**: Support for both MongoDB and MySQL
- **API Documentation**: Clear route structure for documentation

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/webengineering
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=1d
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PATCH /api/auth/reset-password/:token` - Reset password with token
- `PATCH /api/auth/update-password` - Update current user password

### Users

- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/update-me` - Update current user profile
- `DELETE /api/users/delete-me` - Delete current user (set inactive)
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PATCH /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Architecture

This backend follows a layered architecture:

1. **Routes Layer**: Defines API endpoints and routes requests to controllers
2. **Controller Layer**: Handles HTTP requests and responses
3. **Service Layer**: Contains business logic
4. **Data Access Layer**: Models and database interaction

This separation provides:

- Better testability
- Cleaner code organization
- Easier maintenance
- Clear separation of concerns

## Best Practices Implemented

- Environment-based configuration
- Comprehensive error handling
- Proper input validation
- Secure authentication with JWT
- Database abstraction
- Request logging
- Security best practices with Helmet and rate limiting
- Consistent API responses

## Extending the API

To add a new resource to the API:

1. Create a model in the `models` directory
2. Create a service in the `services` directory
3. Create a controller in the `controllers` directory
4. Create routes in the `routes` directory
5. Add the routes to `routes/index.js`

## Security Considerations

This API implementation includes several security features:

- Password hashing with bcrypt
- JWT with expiration
- HTTP-only cookies
- CORS protection
- Helmet for security headers
- Rate limiting
- Input validation
- Role-based access control
