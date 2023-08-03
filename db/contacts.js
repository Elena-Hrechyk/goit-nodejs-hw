const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log("Не вдалося прочитати файл contacts.json");
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const data = contacts.find((contact) => contact.id === contactId);
    return data || null;
  } catch (err) {
    console.log("Не вдалося прочитати файл contacts.json");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const indexDelContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    contacts.splice(indexDelContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(indexDelContact);
    return indexDelContact;
  } catch (err) {
    console.log("Не вдалося перезаписати файл contacts.json");
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
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
  } catch (err) {
    console.log("Не вдалося перезаписати файл contacts.json");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
