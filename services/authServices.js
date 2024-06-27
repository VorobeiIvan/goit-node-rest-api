import User from "../schemas/userSchema.js";
import gravatar from "gravatar";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, +process.env.SALT);
  const avatarURL = gravatar.url(data.email, { protocol: "https" });
  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const findAndUpdateUser = (_id, value) => {
  return User.findByIdAndUpdate(_id, value, { new: true });
};