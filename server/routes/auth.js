import express from "express";
import { register, login, getUserDashboard } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', auth, getUserDashboard);

export default router;
