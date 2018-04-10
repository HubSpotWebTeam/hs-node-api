import createRequest from '../utilities';
import constants from '../constants';

const debug = require('debug')('hs-api:tests');

const defaults = {
  propertyMode: 'value_only',
  formSubmissionMode: 'none'
};

export default function contacts(baseOptions) {
  // FIXME: Merge email and id , add utk
  const getById = async (vid, options = {}) => {
    try {
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
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
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
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
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
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
        baseOptions
      );
      return Promise.resolve({
        msg: `Successfully updated contact details for ${email}`
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const batchUpdateContacts = async options => {
    try {
      const method = 'POST';
      const body = options.map(contact => {
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
        baseOptions
      );
      return Promise.resolve({
        msg: 'Successfully updated contact properties'
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const deleteContact = async ({ vid }) => {
    try {
      const method = 'DELETE';
      await createRequest(
        constants.api.contacts.deleteById,
        { method, vid },
        baseOptions
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
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
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

  const search = async options => {
    // FIXME: Implement this
  };

  const mergeContacts = async (primary, secondary) => {
    // FIXME: Implement this
  };

  // API
  return {
    /**
     * Get contact by ID
     * @async
     * @memberof hs/contacts
     * @method getById
     * @param {int} vid The vid of the contact to retrieve
     * @param {object} properties Optional extra properties to add to the request - see https://developers.hubspot.com/docs/methods/contacts/get_contact
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.contacts.getById(123412313)
     * @returns {Promise}
     */
    getById,
    /**
     * Get contact by email
     * @async
     * @memberof hs/contacts
     * @method getByEmail
     * @param {string} email The email address of the contact
     * @param {object} properties Optional extra properties to add to the request - see https://developers.hubspot.com/docs/methods/contacts/get_contact
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.contacts.getByEmail('foo@bar.com')
     * @returns {Promise}
     */
    getByEmail,
    getByUtk,
    /**
     * Create or update a contact
     * @async
     * @memberof hs/contacts
     * @method createOrUpdateContact
     * @param {object} properties Key/value pair of properties to update. Note: `email` is a required key.
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.contacts.createOrUpdateContact({
     *  email: 'foo@bar.com',
     *  first_name: 'Foo',
     *  last_name: 'Bar'
     * });
     * @returns {Promise}
     */
    createOrUpdateContact,
    batchUpdateContacts,
    deleteContact,
    getContacts,
    search
  };
}
