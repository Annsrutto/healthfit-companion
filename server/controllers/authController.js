import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const hashedPassword = await bycrypt.hash(password, 12);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(201).json({ result: newUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Oops! Something went wrong' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exist" });
		}
		const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign({ id:existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};
