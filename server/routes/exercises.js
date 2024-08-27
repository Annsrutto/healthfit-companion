import express from 'express';
import { getExercises, createExercise, updateExercise, deleteExercise, getExerciseSummary } from '../controllers/exerciseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getExercises);
router.post('/add', auth, createExercise);
router.put('/:id', auth, updateExercise);
router.delete('/:id', auth, deleteExercise);
router.get('/summary', auth, getExerciseSummary);

export default router;

