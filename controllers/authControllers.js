import { findAndUpdateUser, registerUser } from "../services/authServices.js";
import { compare } from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import User from "../schemas/userSchema.js";
import { sendEmail } from "../helpers/sendMail.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const newUser = await registerUser(req.body);
    await sendEmail({
      email,
      verificationToken: newUser.verificationToken,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Please verify your mail");
    }
    const { _id } = user;
    const token = createToken({ _id });
    const updatedUser = await findAndUpdateUser({ _id }, { token });
    res.status(200).json({
      token: updatedUser.token,
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = (req, res, next) => {
  try {
    res.status(200).json({
      email: req.user.email,
      subscription: req.user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await findAndUpdateUser({ _id }, { token: null });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.id });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(
      { _id: user.id },
      { verify: true, verificationToken: null },
    );
    return res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

export const sendEmailAgain = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
    }
    await sendEmail({
      email,
      verificationToken: user.verificationToken,
    });

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};