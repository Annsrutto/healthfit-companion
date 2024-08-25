import express from 'express';
import authRoutes from './auth.js';
import exerciseRoutes from './exercises.js';
import goalRoutes from './goals.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/goals', goalRoutes);

export default router;
