import Joi from "joi";

// Common validation for fields used in both schemas
const amount = Joi.number().min(1).required().messages({
    "any.required": "Amount is required!",
    "number.base": "Amount must be a number",
    "any.min": "Amount must be greater then 0",
});

// Schema for user registration
export const budgetBodySchema = Joi.object({
    amount,
}).options({
    stripUnknown: true,
});
