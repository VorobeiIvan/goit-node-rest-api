import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
   const contacts = await fs.readFile(contactsPath)
   return JSON.parse(contacts)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    return contacts.find( contact => contact.id === contactId) || null
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts,null, 2));
    return deletedContact
}

async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const contactForAdd = {name, email, phone, id:uuidv4()}
    fs.writeFile(contactsPath, JSON.stringify([...contacts,contactForAdd],null, 2));
    return contactForAdd
}

export {listContacts, getContactById, removeContact, addContact}