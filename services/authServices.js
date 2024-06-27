import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, process.env.SALT);
  return User.create({ ...data, password: hashPassword });
};

export const findAndUpdateUser = (_id, value) => {
  return User.findByIdAndUpdate(_id, value, { new: true });
};