import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from "dotenv";
import { registerValidation, loginValidation } from '../utils/validation.js';
import Exercise from '../models/Exercise.js';

dotenv.config();

export const register = async (req, res, next) => {
	try {
		// Validate registration data
		const { error } = registerValidation(req.body);
		if (error) {
			const validationError = new Error(error.details[0].message);
			validationError.statusCode = 400;
			return next(validationError);
		}

		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email }).exec();
		if (existingUser) {
			const error = new Error('User already exists!');
			error.statusCode = 400;
			return next(error);
		}
		const hashedPassword = await bycrypt.hash(password, 12);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(201).json({ result: newUser, token });
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({ error: error.message || 'An unexpected error occurred' });
	}
};

export const login = async (req, res, next) => {
	try {
		// Validate login data
		const { error } = loginValidation(req.body);
		if (error) {
			const validationError = new Error(error.details[0].message);
			validationError.statusCode= 400;
			return next(validationError);
		}

		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			const error = new Error("User doesn't exist!");
			error.statusCode = 400;
			return next(error);
		}
		const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) {
			const error = new Error('Invalid credentials!');
			error.statusCode = 400;
			return next(error);
		}
		const token = jwt.sign({ id:existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		next(error);
	}
};

export const getUserDashboard = async (req, res, next) => {
	try {
	  const userId = req.user?.id;
	  const user = await User.findById(userId);
	  if (!user) {
		return next(createError(404, "User not found"));
	  }
  
	  const currentDateFormatted = new Date();
	  const startToday = new Date(
		currentDateFormatted.getFullYear(),
		currentDateFormatted.getMonth(),
		currentDateFormatted.getDate()
	  );
	  const endToday = new Date(
		currentDateFormatted.getFullYear(),
		currentDateFormatted.getMonth(),
		currentDateFormatted.getDate() + 1
	  );
  
	  //calculte total calories burned
	  const totalCaloriesBurned = await Exercise.aggregate([
		{ $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
		{
		  $group: {
			_id: null,
			totalCaloriesBurned: { $sum: "$caloriesBurned" },
		  },
		},
	  ]);
  
	  //Calculate total no of exercises
	  const totalExercises = await Exercise.countDocuments({
		user: userId,
		date: { $gte: startToday, $lt: endToday },
	  });
  
	  //Calculate average calories burned per workout
	  const avgCaloriesBurnedPerExercise =
		totalCaloriesBurned.length > 0
		  ? totalCaloriesBurned[0].totalCaloriesBurned / totalExercises
		  : 0;
  
	  // Fetch category of exercises
	  const categoryCalories = await Exercise.aggregate([
		{ $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
		{
		  $group: {
			_id: "$category",
			totalCaloriesBurned: { $sum: "$caloriesBurned" },
		  },
		},
	  ]);
  
	  //Format category data for pie chart
  
	  const pieChartData = categoryCalories.map((category, index) => ({
		id: index,
		value: category.totalCaloriesBurned,
		label: category._id,
	  }));
  
	  const weeks = [];
	  const caloriesBurned = [];
	  for (let i = 6; i >= 0; i--) {
		const date = new Date(
		  currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
		);
		weeks.push(`${date.getDate()}th`);
  
		const startOfDay = new Date(
		  date.getFullYear(),
		  date.getMonth(),
		  date.getDate()
		);
		const endOfDay = new Date(
		  date.getFullYear(),
		  date.getMonth(),
		  date.getDate() + 1
		);
  
		const weekData = await Exercise.aggregate([
		  {
			$match: {
			  user: user._id,
			  date: { $gte: startOfDay, $lt: endOfDay },
			},
		  },
		  {
			$group: {
			  _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
			  totalCaloriesBurned: { $sum: "$caloriesBurned" },
			},
		  },
		  {
			$sort: { _id: 1 }, // Sort by date in ascending order
		  },
		]);
  
		caloriesBurned.push(
		  weekData[0]?.totalCaloriesBurned ? weekData[0]?.totalCaloriesBurned : 0
		);
	  }
  
	  return res.status(200).json({
		totalCaloriesBurned:
		  totalCaloriesBurned.length > 0
			? totalCaloriesBurned[0].totalCaloriesBurned
			: 0,
		totalExercises: totalExercises,
		avgCaloriesBurnedPerExercise: avgCaloriesBurnedPerExercise,
		totalWeeksCaloriesBurned: {
		  weeks: weeks,
		  caloriesBurned: caloriesBurned,
		},
		pieChartData: pieChartData,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  export const getExercisesByDate = async (req, res, next) => {
	try {
	  const userId = req.user?.id;
	  const user = await User.findById(userId);
	  let date = req.query.date ? new Date(req.query.date) : new Date();
	  if (!user) {
		return next(createError(404, "User not found"));
	  }
	  const startOfDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	  );
	  const endOfDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate() + 1
	  );
  
	  const todaysExercises = await Exercise.find({
		userId: userId,
		date: { $gte: startOfDay, $lt: endOfDay },
	  });
	  const totalCaloriesBurned = todaysExercises.reduce(
		(total, exercise) => total + exercise.caloriesBurned,
		0
	  );
  
	  return res.status(200).json({ todaysExercises, totalCaloriesBurned });
	} catch (err) {
	  next(err);
	}
  };
  
  export const addExercise = async (req, res, next) => {
	try {
	  const userId = req.user?.id;
	  const { exerciseString } = req.body;
	  if (!exerciseString) {
		return next(createError(400, "Exercise string is missing"));
	  }
	  // Split exerciseString into lines
	  const eachexercise = exerciseString.split(";").map((line) => line.trim());
	  // Check if any exercise start with "#" to indicate categories
	  const categories = eachexercise.filter((line) => line.startsWith("#"));
	  if (categories.length === 0) {
		return next(createError(400, "No categories found in exercise string"));
	  }
  
	  const parsedExercises = [];
	  let currentCategory = "";
	  let count = 0;
  
	  // Loop through each line to parse exercise details
	  await eachexercise.forEach((line) => {
		count++;
		if (line.startsWith("#")) {
		  const parts = line?.split("\n").map((part) => part.trim());
		  console.log(parts);
		  if (parts.length < 5) {
			return next(
			  createError(400, `Exercise string is missing for ${count}th exercise`)
			);
		  }
  
		  // Update current category
		  currentCategory = parts[0].substring(1).trim();
		  // Extract exercise details
		  const exerciseDetails = parseExerciseLine(parts);
		  if (exerciseDetails == null) {
			return next(createError(400, "Please enter in proper format "));
		  }
  
		  if (exerciseDetails) {
			// Add category to exercise details
			exerciseDetails.category = currentCategory;
			parsedExercise.push(exerciseDetails);
		  }
		} else {
		  return next(
			createError(400, `Exercise string is missing for ${count}th exercise`)
		  );
		}
	  });
  
	  // Calculate calories burnt for each exercise
	  await parsedExercises.forEach(async (exercise) => {
		exercise.caloriesBurned = parseFloat(calculateCaloriesBurned(exercise));
		await Exercise.create({ ...exercise, user: userId });
	  });
  
	  return res.status(201).json({
		message: "Exercises added successfully",
		exercises: parsedExercises,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  // Function to parse exercise details from a line
  const parseExerciseLine = (parts) => {
	const details = {};
	console.log(parts);
	if (parts.length >= 5) {
	  details.exerciseName = parts[1].substring(1).trim();
	  details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
	  details.reps = parseInt(
		parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
	  );
	  details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
	  details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
	  console.log(details);
	  return details;
	}
	return null;
  };
  
  // Function to calculate calories burned for an exercise
  const calculateCaloriesBurned = (exerciseDetails) => {
	const durationInMinutes = parseInt(exerciseDetails.duration);
	const weightInKg = parseInt(exerciseDetails.weight);
	const caloriesBurnedPerMinute = 5; // Sample value, actual calculation may vary
	return durationInMinutes * caloriesBurnedPerMinute * weightInKg;
  };
