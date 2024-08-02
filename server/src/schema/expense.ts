import Joi from "joi";

// Common validation for fields used in both schemas
const title = Joi.string().required().messages({
    "any.required": "Title name is required!",
});

const categoryId = Joi.number().required().messages({
    "any.required": "Category Id is required!",
});

const categoryName = Joi.string().optional().messages({
    "string.empty": "Category Name cannot be an empty string!",
});

const groupId = Joi.number().optional().messages({
    "number.base": "group id must be a number",
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
    categoryName,
    categoryId,
    groupId,
    paymentMethod,
    amount,
}).options({
    stripUnknown: true,
});

// Schema for user registration
export const updateExpenseBodySchema = Joi.object({
    title,
    categoryId,
    amount,
    groupId,
    paymentMethod,
}).options({
    stripUnknown: true,
});
