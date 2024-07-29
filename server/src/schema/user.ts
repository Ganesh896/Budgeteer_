import Joi from "joi";

// Common validation for fields used in both schemas
const firstName = Joi.string().required().messages({
    "any.required": "First name is required!",
});

const lastName = Joi.string().required().messages({
    "any.required": "Last name is required!",
});

const email = Joi.string().email().required().messages({
    "any.required": "Email is required!",
    "string.email": "Email must be in a valid format!",
});

const phone = Joi.string().pattern(/^\d+$/).length(10).required().messages({
    "any.required": "Phone number is required!",
    "string.length": "Phone number must be exactly 10 digits!",
    "string.pattern.base": "Phone number must be a number!",
});

const address = Joi.string().required().messages({
    "any.required": "Address is required!",
});

// Password validation logic with custom rules
const password = Joi.string()
    .min(8)
    .required()
    .messages({
        "any.required": "Password is required!",
        "string.min": "Password must be at least 8 characters!",
        "password.uppercase": "Password must contain at least one uppercase letter!",
        "password.lowercase": "Password must contain at least one lowercase letter!",
        "password.special": "Password must contain at least one special character!",
    })
    .custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
            return helpers.error("password.uppercase");
        }
        if (!/[a-z]/.test(value)) {
            return helpers.error("password.lowercase");
        }
        if (!/[!@#$%]/.test(value)) {
            return helpers.error("password.special");
        }
        return value;
    });

// Schema for user registration
export const userRegisterSchema = Joi.object({
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
}).options({
    stripUnknown: true,
});

// Schema for user update
export const userUpdateSchema = Joi.object({
    firstName,
    lastName,
    email,
    phone,
    address,
}).options({
    stripUnknown: true,
});
