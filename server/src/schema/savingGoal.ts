import Joi from "joi";

// Common validation for fields used in both schemas
const goalName = Joi.string().required().messages({
    "any.required": "Goal Name is required!",
});

const goalAmount = Joi.number().min(1).required().messages({
    "any.required": "Goal Amount is required!",
    "number.base": "Goal Amount must be a number",
    "any.min": "Goal Amount must be greater then 0",
});

// Schema for user registration
export const savingGoalBodySchema = Joi.object({
    goalName,
    goalAmount,
}).options({
    stripUnknown: true,
});
