import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { registerValidation, loginValidation } from '../utils/validation.js';

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
		const existingUser = await User.findOne({ email });
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
		next(error);
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
			errorHandler.statusCode = 400;
			return next(error);
		}
		const token = jwt.sign({ id:existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		next(error);
	}
};
