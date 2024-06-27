import { listContacts, getContactById, removeContact, addContact, updateContact as update } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import { contactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    throw HttpError(404, { message: "Not found" });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    throw HttpError(404, { message: "Not found" });
  } catch (error) {
    next(error);
  }
};

export const createContact = [
  validateBody(contactSchema),
  async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = await addContact({ name, email, phone });
      if (!newContact) {
        throw HttpError(404, { message: "Something went wrong" });
      }
      return res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }
];

export const updateContact = [
  validateBody(updateContactSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedContact = await update(id, req.body);
      if (!updatedContact) {
        throw HttpError(404, { message: "Not found" });
      }
      return res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }
];
