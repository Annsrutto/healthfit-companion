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
	date: {
		type:Date,
		required: true,
		default: Date.now
	},
	notes: {
		type: String,
		trim: true
	}
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
