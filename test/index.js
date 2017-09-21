import HubSpotAPI from '../src';

// Linked to Portal ID 2406023 Developer Portal
const hapikey = 'a714cac4-a45c-42ff-9905-da4dc8838d75';

const hs = new HubSpotAPI({ hapikey });

// Get
const getContactById = hs.contacts.getById(701,
  { property: ['hs_email_open', 'query'] });
const getContactByEmail = hs.contacts.getByEmail('stephen@appstruct.io',
  { property: ['hs_email_open', 'query'] });
const createContact = hs.contacts.createContact(
  { email: 'dmooney@hubspot.com', firstname: 'David', lastname: 'Mooney' });

Promise.all([
  getContactById,
  getContactByEmail,
  createContact
]).then(responses => {
  console.log(responses);

}).catch(e => {
  console.log(e);
})
