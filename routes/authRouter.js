import express from "express";

import {
  login,
  register,
  logout,
  getCurrent,
} from "../controllers/authControllers.js";

import {
  signUpUserSchema,
  signInUserSchema,
} from "../schemas/usersJoiSchemas.js";

import validateBody from "../helpers/validateBody.js";
import { isAuth } from "../helpers/isAuth.js";
import { uploadMiddleware } from "../helpers/upload.js";
import { updateUser } from "../controllers/userControllers.js";
import { checkAvatarExists } from "../helpers/avatarExist.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(signUpUserSchema), register);

authRouter.post("/login", validateBody(signInUserSchema), login);

authRouter.post("/logout", isAuth, logout);

authRouter.get("/current", isAuth, getCurrent);

authRouter.patch(
  "/avatars",
  isAuth,
  uploadMiddleware.single("avatar"),
  updateUser,
);

authRouter.get("/avatars/:id", checkAvatarExists);

export default authRouter;