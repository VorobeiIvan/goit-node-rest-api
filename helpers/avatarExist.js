import User from "../schemas/userSchema.js";
import httpError from "./HttpError.js";

export const checkAvatarExists = async (req, res, next) => {
  try {
    const avatarURL = `avatars/${req.params.id}`;
    const avatar = await User.findOne({
      avatarURL,
    });
    if (!avatar) {
      throw httpError(404, "Avatar not found");
    }
    next();
  } catch (err) {
    next(err);
  }
};