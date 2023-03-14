const fs = require('fs').promises;
const path = require('node:path');

const { uuid } = require('uuidv4');

const contactsPath = path.join('db', 'contacts.json');

const errorCatcher = fn => {
  try {
    return fn;
  } catch (error) {
    console.log('======error=====');
    console.log(error);
  }
};

const contactList = async () => {
  const result = await errorCatcher(await fs.readFile(contactsPath));
  const contacts = JSON.parse(result.toString());

  return contacts;
};

// TODO: document each function

const listContacts = async () => {
  const contacts = await errorCatcher(await contactList());

  console.log('=======================');
  console.log(contacts);
  console.log('=======================');
};

const getContactById = async contactId => {
  const contacts = await errorCatcher(await contactList());

  const contactById = contacts.find(
    contact => contact.id === contactId.toString()
  );

  console.log('=======================');
  console.log(contactById || 'There is no such contact');
  console.log('=======================');
};

const removeContact = async contactId => {
  const contacts = await errorCatcher(await contactList());

  const newArray = contacts.filter(
    contact => contact.id !== contactId.toString()
  );

  errorCatcher(await fs.writeFile(contactsPath, JSON.stringify(newArray)));
};

const addContact = async (name, email, phone) => {
  const contacts = await errorCatcher(await contactList());
  const newContact = { id: uuid(), name, email, phone };

  const newArray = [...contacts, newContact];

  errorCatcher(await fs.writeFile(contactsPath, JSON.stringify(newArray)));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
