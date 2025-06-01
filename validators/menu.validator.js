import Joi from "joi";

export const categoryInsertSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().max(200).optional(),
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
