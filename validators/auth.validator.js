import Joi from "joi";

// Common email validator, reusable
const email = Joi.string().email().required().messages({
  "string.email": "Please enter a valid email address.",
  "any.required": "Email is required.",
});

const password = Joi.string().min(8).max(128).required().messages({
  "string.min": "Password must be at least 8 characters long.",
  "string.max": "Password cannot exceed 128 characters.",
  "any.required": "Password is required.",
});

export const loginSchema = Joi.object({
  email,
  password,
});

export const registerSchema = Joi.object({
  profile_photo: Joi.string().uri().optional().allow(null, ""), // optional URL or empty
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters.",
    "string.max": "Name cannot exceed 50 characters.",
    "any.required": "Name is required.",
  }),
  email,
  password,
  role: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .optional(),
});

export const generateTokenSchema = Joi.object({
  email,
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "Token is required.",
  }),
  newPassword: password.label("New Password"),
});
