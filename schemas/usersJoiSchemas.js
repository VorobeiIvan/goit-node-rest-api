import Joi from "joi";

export const verifySchema = Joi.object({
  email: Joi.string().email().required(),
});
export const signUpUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const signInUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});