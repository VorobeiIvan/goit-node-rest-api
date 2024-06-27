import Contacts from "../schemas/contactsSchema.js";

async function listContacts() {
   return Contacts.find()
}

async function getContactById(_id) {
    return Contacts.findOne({_id})
}

async function removeContact(_id) {
    return Contacts.findOneAndDelete({_id})
}

async function addContact({...body}) {
    return Contacts.create(body)
}
async function updateContact (_id, body) {
    return Contacts.findByIdAndUpdate({_id}, body, {new: true})
}

async function updateStatusContact (_id, value) {
    return Contacts.findByIdAndUpdate({_id}, value, {new: true})
}

export {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact}