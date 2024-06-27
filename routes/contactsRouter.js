import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactStatus,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsJoiSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { isValidId } from "../helpers/isValidId.js";
import { isAuth } from "../helpers/isAuth.js";

const contactsRouter = express.Router();

contactsRouter.get("/", isAuth, getAllContacts);

contactsRouter.get("/:id", isValidId, isAuth, getOneContact);

contactsRouter.delete("/:id", isValidId, isAuth, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  isAuth,
  createContact,
);

contactsRouter.put(
  "/:id",
  isValidId,
  isAuth,
  validateBody(updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isAuth,
  validateBody(updateFavoriteSchema),
  updateContactStatus,
);

export default contactsRouter;