import express from "express";
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getGoals);
router.post('/', auth, createGoal);
router.patch('/:id', auth, updateGoal);
router.delete('/:id', auth, deleteGoal);

export default router;
