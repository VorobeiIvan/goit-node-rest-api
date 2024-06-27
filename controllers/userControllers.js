import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import User from "../schemas/userSchema.js";
import HttpError from "../helpers/HttpError.js";

export const updateUser = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "File is missing");
    }
    const { path: tempPath, filename } = req.file;
    const tempFilePath = path.resolve(tempPath);
    const outputDir = path.resolve("public", "avatars");
    const outputFilePath = path.join(outputDir, filename);

    const image = await Jimp.read(tempFilePath);
    await image.resize(250, 250).writeAsync(tempFilePath);

    await fs.mkdir(outputDir, { recursive: true });

    await fs.rename(tempFilePath, outputFilePath);
    const avatarURL = path.join("avatars", filename);
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL },
      { new: true },
    );

    res.status(200).json({ avatarURL: result.avatarURL });
  } catch (error) {
    next(error);
  }
};