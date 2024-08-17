import Exercise from '../models/Exercise.js'

export const getExercises = async (req, res) => {
	try {
		const exercises = await Exercise.find({ user: req.userId });
		res.status(200).json(exercises);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createExercise = async (req, res) => {
	const exercise = new Exercise({ ...req.body, user: req.userId });
	try {
		await exercise.save();
		res.status(201).json(exercise);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateExercise = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedExercise = await Exercise.findOneAndUpdate(
			{ _id: id, user: req.userId },
			{ ...req.body },
			{ new: true}
		);
		if (!updatedExercise) {
			return res.status(404).json({ message: 'Exercise not found' });
		}
		res.json(updateExercise);
	} catch (error) {
		res.status(400).json({ message: error.message});
	}
}

export const deleteExercise = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedExercise = await Exercise.findOneAndDelete({ _id: id, user: req.userId });
		if (!deletedExercise) {
			return res.status(404).json({ message: 'Exercise not found' });
		}
		res.json({ message: 'Exercise deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
