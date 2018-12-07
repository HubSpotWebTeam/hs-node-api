import createRequest from '../utilities';
import constants from '../constants';

const debug = require('debug')('hubspot-api:tests'); // eslint-disable-line

const defaults = {
  propertyMode: 'value_only',
  formSubmissionMode: 'none'
};
let _baseOptions;

const getById = async (vid, options = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, options);
    const contact = await createRequest(
      constants.api.contacts.byId,
      { vid },
      mergedProps
    );
    return Promise.resolve(contact);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getByEmail = async (email, options) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, options);
    const contact = await createRequest(
      constants.api.contacts.byEmail,
      { email },
      mergedProps
    );
    return Promise.resolve(contact);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getByUtk = async (utk, options) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, options);
    const contact = await createRequest(
      constants.api.contacts.byUtk,
      { utk },
      mergedProps
    );
    return Promise.resolve(contact);
  } catch (e) {
    return Promise.reject(e);
  }
};

// NOTE: Not recommended to use this, only for offline contacts.
const createOrUpdateContact = async obj => {
  try {
    const method = 'POST';
    const { email } = obj;
    if (!email) {
      throw new Error(
        'Property "email" is required for creating contacts with this method.'
      );
    }

    const body = {
      properties: Object.keys(obj).map(key => ({
        property: key,
        value: obj[key]
      }))
    };
    await createRequest(
      constants.api.contacts.createContact,
      { method, body, email },
      _baseOptions
    );
    return Promise.resolve({
      msg: `Successfully updated contact details for ${email}`
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const batchUpdateContacts = async contactsToUpdate => {
  try {
    const method = 'POST';
    const body = contactsToUpdate.map(contact => {
      const contactType = /@/i.test(contact.id) ? 'email' : 'vid';
      const properties = Object.keys(contact.updates).map(i => ({
        property: i,
        value: contact.updates[i]
      }));
      return {
        [`${contactType}`]: contact.id,
        properties
      };
    });
    await createRequest(
      constants.api.contacts.batchUpdateContacts,
      { method, body },
      _baseOptions
    );
    return Promise.resolve({
      msg: 'Successfully updated contact properties'
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteContact = async vid => {
  try {
    const method = 'DELETE';
    await createRequest(
      constants.api.contacts.deleteById,
      { method, vid },
      _baseOptions
    );
    return Promise.resolve({
      msg: `Successfully delete contact details for ${vid}`
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const getContacts = async options => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, options);
    const allContacts = await createRequest(
      constants.api.contacts.getAll,
      {},
      mergedProps
    );
    return Promise.resolve(allContacts);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getRecentlyModified = async options => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, options);
    const contacts = await createRequest(
      constants.api.contacts.getRecentlyModified,
      {},
      mergedProps
    );
    return Promise.resolve(contacts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

// const search = async options => {
//   // FIXME: Implement this
// };
//
// const mergeContacts = async (primary, secondary) => {
//   // FIXME: Implement this
// };

export default function contacts(baseOptions) {
  _baseOptions = baseOptions;
  // API
  return {
    /**
     * Get contact by ID
     * @async
     * @memberof hs/contacts
     * @method getById
     * @param {int} vid The vid of the contact to retrieve
     * @param {object} properties Optional extra properties to add to the request - see {@link https://developers.hubspot.com/docs/methods/contacts/get_contact|developer docs}
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.getById(123412313).then(response => console.log(response))
     * @returns {Promise}
     */
    getById,
    /**
     * Get contact by email
     * @async
     * @memberof hs/contacts
     * @method getByEmail
     * @param {string} email The email address of the contact
     * @param {object} properties Optional extra properties to add to the request - see {@link https://developers.hubspot.com/docs/methods/contacts/get_contact|developer docs}
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.getByEmail('foo@bar.com').then(response => console.log(response))
     * @returns {Promise}
     */
    getByEmail,
    /**
     * Get contact by UTK (user token)
     * @async
     * @memberof hs/contacts
     * @method getByUtk
     * @param {string} utk The utk (User token) of the contact
     * @param {object} properties Optional extra properties to add to the request - see {@link https://developers.hubspot.com/docs/methods/contacts/get_contact|developer docs}
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.getByUtk('jdalksjd82739jaskdksadjhkds').then(response => console.log(response))
     * @returns {Promise}
     */
    getByUtk,
    /**
     * Create or update a contact
     * @async
     * @memberof hs/contacts
     * @method createOrUpdateContact
     * @param {object} properties Key/value pair of properties to update. Note: `email` is a required key.
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.createOrUpdateContact({
     *  email: 'foo@bar.com',
     *  first_name: 'Foo',
     *  last_name: 'Bar'
     * }).then(response => console.log(response));
     * @returns {Promise}
     */
    createOrUpdateContact,
    /**
     * Batch update a set of contacts
     * @async
     * @memberof hs/contacts
     * @method batchUpdateContacts
     * @param {array} contactsToUpdate Array of contact updates, see example below
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.batchUpdateContacts([{
         id: 129838129313,
         updates: {
           email: 'sdjfhksdjf@boo.com',
           phone_no: '9128301982312'
         }
       },
       {
         id: 2319082301823,
         updates: {
           email: 'skdjflkjsfdsfs@boo.com',
           phone_no: '1293801293801923'
         }
       },
       {
         id: 271263871623,
         updates: {
           email: 'mxcxmncvmxc@boo.com',
           phone_no: '01823981023'
         }
       },
       {
         id: 127361287312,
         updates: {
           email: 'yqeuyiqwuyeiquwey@boo.com',
           phone_no: '127398172398123'
         }
       }
       // .....
     ]).then(response => console.log(response))
     * @returns {Promise}
     */
    batchUpdateContacts,
    /**
     * Remove a contact
     * @async
     * @memberof hs/contacts
     * @method deleteContact
     * @param {number} id Id of contact to remove
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.deleteContact(82739182731).then(response => console.log(response));
     * @returns {Promise}
     */
    deleteContact,
    /**
     * Get all contacts
     * @async
     * @memberof hs/contacts
     * @method getContacts
     * @param {object} options Additional options & filters to apply
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.getContacts({ limit: 25 }).then(response => console.log(response));
     * @returns {Promise}
     */
    getContacts,
    /**
     * Get recently modified contacts
     * @async
     * @memberof hs/contacts
     * @method getRecentlyModified
     * @param {object} options Additional options and paging criteria
     * @example
     * const hs = new HubspotClient(props);
     * hs.contacts.getRecentlyModified({count: 5}).then(response => console.log(response))
     * @property {number} [options.count] - Specifies the number of contacts to be returned.
     * @property {number} [options.timeOffset] - This is used along with `vidOffset` to get the next page of results. Each request will return a `time-offset` and `vid-offset` in the response, and you'd use those offsets in the URL of your next request to get the next page of results.
     * @property {number} [options.vidOffset] - This is used along with `timeOffset` to get the next page of results.
     * @returns {Promise}
     */
    getRecentlyModified
    // search, // Unimplemented
    // mergeContacts // Unimplemented
  };
}
