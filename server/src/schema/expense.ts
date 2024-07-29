import Joi from "joi";

// Common validation for fields used in both schemas
const title = Joi.string().required().messages({
    "any.required": "Title name is required!",
});

const description = Joi.string().allow("").optional().messages({
    "string.empty": "Description cannot be an empty string!",
});

const categoryId = Joi.number().required().messages({
    "any.required": "Category Id is required!",
});

const paymentMethod = Joi.string().required().messages({
    "any.required": "Payment method is required!",
});

const amount = Joi.number().required().messages({
    "any.required": "Amount is required!",
});

// Schema for user registration
export const expenseBodySchema = Joi.object({
    title,
    description,
    categoryId,
    paymentMethod,
    amount,
}).options({
    stripUnknown: true,
});
