import Joi from "joi";

export const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);
};

export const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	return schema.validate(data);
}

export const exerciseValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        type: Joi.string().required().valid('cardio', 'strength', 'flexibility', 'balance'),
        duration: Joi.number().required().min(1),
        sets: Joi.number(),
        reps: Joi.number(),
        weight: Joi.number(),
        caloriesBurned: Joi.number(),
        date: Joi.date(),
        notes: Joi.string().trim()
    });

    return schema.validate(data);
};