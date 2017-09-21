import { createRequest } from '../utilities';
import constants from '../constants';

const defaults = {
  propertyMode: 'value_only',
  formSubmissionMode: 'none'
};

module.exports = function contacts(baseOptions) {
  // FIXME: Merge email and id , add utk
  const getById = async(vid, options) => {
    try {
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
      const contact = await createRequest(constants.api.contacts.byId, { vid }, mergedProps);
      return Promise.resolve(contact);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const getByEmail = async(email, options) => {
    try {
      const mergedProps = Object.assign({}, defaults, baseOptions, options);
      const contact = await createRequest(constants.api.contacts.byEmail, { email }, mergedProps);
      return Promise.resolve(contact);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  // NOTE: Not recommended to use this, only for offline contacts.
  const createContact = async(obj) => {
    try {
      const method = 'POST';
      const body = {
        properties: Object.keys(obj).map(key => {
          return {
            property: key,
            value: obj[key]
          };
        })
      };
      const contact = await createRequest(constants.api.contacts.createContact, { method, body }, baseOptions);
      return Promise.resolve(contact);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const updateContact = async(options) => {
    // FIXME: Implement this
  };

  const batchUpdateContacts = async(options) => {
    // FIXME: Implement this
  };

  const deleteContact = async(options) => {
    // FIXME: Implement this
  };

  const getContacts = async(options, criteria) => {
    // FIXME: Implement this
    // Used for
    // Retrieving all contacts
    // Recently modified
    // Recently created
    // Group of contacts by id
    // Group of contacts by email address
  };

  const search = async(options) => {
    // FIXME: Implement this
  };

  const mergeContacts = async(primary, secondary) => {
    // FIXME: Implement this
  };

  // API
  return {
    getById,
    getByEmail,
    createContact,
    updateContact,
    batchUpdateContacts,
    deleteContact,
    getContacts,
    search
  };

}
