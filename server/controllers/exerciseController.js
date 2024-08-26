import Exercise from '../models/Exercise.js'

export const getExercises = async (req, res, next) => {
    try {
        const { startDate, endDate, type } = req.query;
        let query = { user: req.user.id };
        
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        
        if (type) {
            query.type = type;
        }
        
        const exercises = await Exercise.find(query).sort({ date: -1 });
        res.status(200).json(exercises);
    } catch (error) {
        next(error);
    }
};

export const createExercise = async (req, res, next) => {
	try {
		const { name, type, duration, sets, reps, weight, caloriesBurned, date, notes } = req.body;
		const newExercise = new Exercise({ 
			user: req.userId,
			name,
			type,
			duration,
			sets,
			reps,
			weight,
			caloriesBurned,
			date: date || Date.now(),
			notes
		 });
		 const savedExercise = await newExercise.save();
		res.status(201).json(savedExercise);
	} catch (error) {
		next(error);
	}
};

export const updateExercise = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, type, duration, sets, reps, weight, caloriesBurned, date, notes } = req.body
		const updatedExercise = await Exercise.findOneAndUpdate(
			{ _id: id, user: req.userId },
			{ name, type, duration, sets, reps, weight, caloriesBurned, date, notes },
			{ new: true}
		);
		if (!updatedExercise) {
			return res.status(404).json({ message: "Exercise not found or you're not authorized to update it" });
		}
		res.status(200).json(updatedExercise);
	} catch (error) {
		next(error);
	}
}

export const deleteExercise = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedExercise = await Exercise.findOneAndDelete({ _id: id, user: req.userId });
		if (!deletedExercise) {
			return res.status(404).json({ message: "Exercise not found or you're not authorized to delete it" });
		}
		res.status(200).json({ message: "Exercise deleted successfully" });
	} catch (error) {
		next(error);
	}
};

export const getExerciseSummary = async (req, res, next) => {
    try {
        const summary = await Exercise.aggregate([
            { $match: { user: req.user.id } },
            { $group: {
                _id: '$type',
                count: { $sum: 1 },
                totalDuration: { $sum: '$duration' },
                totalCaloriesBurned: { $sum: '$caloriesBurned' }
            }}
        ]);
        res.status(200).json(summary);
    } catch (error) {
        next(error);
    }
};
