import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact as update,
    updateStatusContact,
  } from "../services/contactsServices.js";
  import HttpError from "../helpers/HttpError.js";
  
  export const getAllContacts = async (req, res, next) => {
    try {
      const contacts = await listContacts(req.user._id);
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  };
  
  export const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id, req.user._id);
      if (contact) {
        return res.status(200).json(contact);
      }
      throw HttpError(404, "Not found");
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await removeContact(id, req.user._id);
      if (contact) {
        return res.status(200).json(contact);
      }
      throw HttpError(404, "Not found");
    } catch (error) {
      next(error);
    }
  };
  
  export const createContact = async (req, res, next) => {
    try {
      const { name, email, phone, favorite } = req.body;
      const { _id: owner } = req.user;
      const newContact = await addContact({
        name,
        email,
        phone,
        favorite,
        owner,
      });
      if (!newContact) {
        throw HttpError(404, "something went wrong");
      }
      return res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedContact = await update(id, req.body, req.user._id);
      if (updatedContact) {
        return res.status(200).json(updatedContact);
      }
      throw HttpError(404, "Not found");
    } catch (error) {
      next(error);
    }
  };
  
  export const updateContactStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedContact = await updateStatusContact(
        id,
        req.body,
        req.user._id,
      );
      if (updatedContact) {
        return res.status(200).json(updatedContact);
      }
      throw HttpError(404, "Not found");
    } catch (error) {
      next(error);
    }
  };