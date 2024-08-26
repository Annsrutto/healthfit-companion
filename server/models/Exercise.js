import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
		required: true,
		enum: ['cardio', 'strength', 'flexibility', 'balance']
	},
	duration: {
		type: Number,
		required: true,
		min: 1
	},
	sets: {
		type: Number,
	},
	reps: {
		type: Number,
	},
	weight: {
		type: Number,
	},
	caloriesBurned: {
		type: Number,
	},
	notes: {
		type: String,
		trim: true
	},
	date: {
		type:Date,
		required: true,
		default: Date.now
	}
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
