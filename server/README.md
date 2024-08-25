# HealthFit Companion Backend

This is the backend server for the HealthFit Companion application. It provides the API endpoints and database interactions necessary to support the frontend of the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

## Main Features

1. User Authentication
   - User registration
   - User login
   - JWT-based authentication for protected routes

2. Exercise Management
   - Create, read, update, and delete exercises
   - Fetch exercises for authenticated users

3. Goal Tracking
   - Set fitness goals
   - Track progress towards goals
   - Update and delete goals

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user

### Exercises

- GET /api/exercises - Fetch all exercises for the authenticated user
- POST /api/exercises - Create a new exercise
- PATCH /api/exercises/:id - Update an existing exercise
- DELETE /api/exercises/:id - Delete an exercise

### Goals

- GET /api/goals - Fetch all goals for the authenticated user
- POST /api/goals - Create a new goal
- PATCH /api/goals/:id - Update an existing goal
- DELETE /api/goals/:id - Delete a goal

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the server: `npm run dev`

## Database

This application uses MongoDB as its database. Ensure you have MongoDB installed and running, or use a cloud-based MongoDB service.

## Authentication

Authentication is handled using JSON Web Tokens (JWT). Protected routes require a valid JWT to be included in the Authorization header of the request.

## Error Handling

The application includes centralized error handling to manage and respond to errors consistently across all routes.

## Middleware

- `auth.js` - Middleware for authenticating requests to protected routes
- `error.js` - Global error handling middleware

## Models

- User - Represents user accounts
- Exercise - Represents individual exercises
- Goal - Represents fitness goals

## Controllers

- authController - Handles user registration and login
- exerciseController - Manages CRUD operations for exercises
- goalController - Manages CRUD operations for goals

## Data Validation

Input data is validated using Joi to ensure data integrity and security.
