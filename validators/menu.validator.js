import Joi from "joi";

export const categoryInsertSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  description: Joi.string().trim().max(255).optional().allow(""),
});

export const categoryUpdateSchema = Joi.object({
  oldName: Joi.string().trim().required(),
  newName: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().max(200).optional(),
});

export const categoryDeleteSchema = Joi.object({
  _id: Joi.string().length(24).hex().required().messages({
    "string.length": "_id must be a 24-character string.",
    "string.hex": "_id must be a valid hexadecimal.",
  }),
});

export const foodItemInsertSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ "string.pattern.base": "Invalid category ID format." }),
  description: Joi.string().trim().max(500).optional().allow(""),
});

export const itemVariantInsertSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  price: Joi.number().positive().precision(2).required(),
  available: Joi.boolean().optional(),
});
