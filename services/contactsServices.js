import Contacts from "../schemas/contactsSchema.js";

async function listContacts(owner) {
  return Contacts.find({ owner });
}

async function getContactById(_id, owner) {
  return Contacts.findOne({ _id, owner });
}

async function removeContact(_id, owner) {
  return Contacts.findOneAndDelete({ _id, owner });
}

async function addContact({ ...body }) {
  return Contacts.create(body);
}
async function updateContact(_id, body, owner) {
  return Contacts.findOneAndUpdate({ _id, owner }, body, { new: true });
}

async function updateStatusContact(_id, value, owner) {
  return Contacts.findOneAndUpdate({ _id, owner }, value, { new: true });
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};