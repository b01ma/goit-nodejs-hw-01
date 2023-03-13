const fs = require('fs').promises;
const path = require('node:path');

const { uuid } = require('uuidv4');

const contactsPath = path.join('db', 'contacts.json');

const contactList = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result.toString());

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

// TODO: document each function

const listContacts = async () => {
  try {
    const contacts = await contactList();

    console.log('=======================');
    console.log(contacts);
    console.log('=======================');
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await contactList();

    const contactById = contacts.find(
      contact => contact.id === contactId.toString()
    );

    console.log('=======================');
    console.log(contactById || 'There is no such contact');
    console.log('=======================');
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await contactList();

    const newArray = contacts.filter(contact => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newArray));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await contactList();
    const newContact = { id: uuid(), name, email, phone };

    const newArray = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newArray));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
