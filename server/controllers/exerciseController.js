import Exercise from '../models/Exercise.js'

export const getExercises = async (req, res, next) => {
	try {
		const exercises = await Exercise.find({ user: req.userId });
		res.status(200).json(exercises);
	} catch (error) {
		next(error);
	}
};

export const createExercise = async (req, res, next) => {
	try {
		const exercise = new Exercise({ ...req.body, user: req.userId });
		await exercise.save();
		res.status(201).json(exercise);
	} catch (error) {
		next(error);
	}
};

export const updateExercise = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedExercise = await Exercise.findOneAndUpdate(
			{ _id: id, user: req.userId },
			{ ...req.body },
			{ new: true}
		);
		if (!updatedExercise) {
			const error = new Error('Exercise not found!');
			error.statusCode = 404;
			return next(error);
		}
		res.json(updatedExercise);
	} catch (error) {
		next(error);
	}
}

export const deleteExercise = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedExercise = await Exercise.findOneAndDelete({ _id: id, user: req.userId });
		if (!deletedExercise) {
			const error = new Error('Exercise not found!');
			error.statusCode = 404;
			return next(error);
		}
		res.json({ message: 'Exercise deleted successfully' });
	} catch (error) {
		next(error);
	}
};
