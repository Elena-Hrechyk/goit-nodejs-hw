const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const data = contacts.find((contact) => contact.id === contactId);
  return data || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexDelContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  contacts.splice(indexDelContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(indexDelContact);
  return indexDelContact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
