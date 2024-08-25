import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import exerciseRoutes from './routes/exercises.js';
import goalRoutes from './routes/goals.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';

dotenv.config();

const app = express();

// Middleware setup and error handling
app.use(express.json());
app.use(cors({
	origin: 'http://localhost:3000',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(errorHandler);

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/goals', goalRoutes);

// Database connection
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
