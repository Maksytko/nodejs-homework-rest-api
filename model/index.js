const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
};

const getContactById = async (contactId) => {
  const id = Number(contactId);
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === id);
  return contactById;
};

const removeContact = async (contactId) => {
  const id = Number(contactId);
  const contacts = await listContacts();
  const contactForDelete = contacts.findIndex((contact) => contact.id === id);
  if (contactForDelete >= 0) {
    const contact = contacts.splice(contactForDelete, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = { ...body, id };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = Number(contactId);
  const contacts = await listContacts();
  const contactForUpdate = contacts.findIndex((contact) => contact.id === id);
  if (contactForUpdate >= 0) {
    const updatedContact = { ...body, id };
    contacts.splice(contactForUpdate, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
