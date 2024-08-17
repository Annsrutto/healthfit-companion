import Goal from '../models/Goal.js'

export const getGoals = async (req, res) => {
	try {
		const goals = await Goal.find({ user: req.userId });
		res.status(200).json(goals);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createGoal = async (req, res) => {
	const goal = new Goal({ ...req.body, user: req.userId });
	try {
		await goal.save();
		res.status(201).json(goal);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateGoal = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedGoal = await Goal.findOneAndUpdate(
			{ _id: id, user: req.userId },
			{ ...req.body },
			{ new: true}
		);
		if (!updatedGoal) {
			return res.status(404).json({ message: 'Goal not found' });
		}
		res.json(updateGoal);
	} catch (error) {
		res.status(400).json({ message: error.message});
	}
};

export const deleteGoal = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedGoal = await Goal.findOneAndDelete({ _id: id, user: req.userId});
		if (!deletedGoal) {
			return res.status(404).json({ message: 'Goal not found' });
		}
		res.json({ message: 'Goal deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message});
	}
};
