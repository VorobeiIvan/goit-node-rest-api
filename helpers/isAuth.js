import HttpError from "./HttpError.js";
import { verifyToken } from "./jwt.js";
import User from "../schemas/userSchema.js";

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  if (!authorization.startsWith("Bearer ")) {
    return next(HttpError(401, "Bearer is needed"));
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const { _id } = verifyToken(token);
    const user = await User.findOne({ _id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    if (!user.token) {
      return next(HttpError(401, "User logout"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};