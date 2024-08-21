import express from "express";
import { getExercises, createExercise, updateExercise, deleteExercise } from '../controllers/exerciseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getExercises);
router.post('/', auth, createExercise);
router.patch('/:id', auth, updateExercise);
router.delete('/:id', auth, deleteExercise);

export default router;
