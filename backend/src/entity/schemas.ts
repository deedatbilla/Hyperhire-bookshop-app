import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().email(),
  password: joi.string().required().min(6),
});
export const signInSchema = joi.object({
  email: joi.string().email(),
  password: joi.string().required().min(6),
});
export const createOrderSchema = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
});
export const getOrderHistorySchema = joi.object({
  userId: joi.string().required(),
  page: joi.number().required(),
  limit: joi.number().required(),
});
