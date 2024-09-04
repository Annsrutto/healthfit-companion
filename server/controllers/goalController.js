import Goal from '../models/Goal.js';

export const getGoals = async (req, res, next) => {
	try {
		const goals = await Goal.find({ user: req.userId });
		res.status(200).json(goals);
	} catch (error) {
		next(error);
	}
};

export const createGoal = async (req, res, next) => {
	try {
		const goal = new Goal({ ...req.body, user: req.userId });
		await goal.save();
		res.status(201).json(goal);
	} catch (error) {
		next(error);
	}
};

export const updateGoal = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedGoal = await Goal.findOneAndUpdate(
			{ _id: id, user: req.userId },
			{ ...req.body },
			{ new: true }
		);
		if (!updatedGoal) {
			const error = new Error('Goal not found!');
			error.statusCode = 404;
			return next(error);
		}
		res.json(updatedGoal);
	} catch (error) {
		next(error);
	}
};

export const deleteGoal = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedGoal = await Goal.findOneAndDelete({ _id: id, user: req.userId });
		if (!deletedGoal) {
			const error = new Error('Goal not found!');
			error.statusCode = 404;
			return next(error);
		}
		res.json({ message: 'Goal deleted successfully' });
	} catch (error) {
		next(error);
	}
};
