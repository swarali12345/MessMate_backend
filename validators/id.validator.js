import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
