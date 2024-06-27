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

const authRouter = express.Router();

authRouter.post("/register", validateBody(signUpUserSchema), register);

authRouter.post("/login", validateBody(signInUserSchema), login);

authRouter.post("/logout", isAuth, logout);

authRouter.get("/current", isAuth, getCurrent);

export default authRouter;