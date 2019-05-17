import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const debug = require('debug')('hubspot-api:tests'); // eslint-disable-line
let _baseOptions;

const defaults = {
  propertyMode: 'value_only',
  formSubmissionMode: 'none'
};

const getById = async listId => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, _baseOptions);
    const list = await createRequest(
      constants.api.contactsList.byId,
      { listId },
      mergedProps
    );
    return Promise.resolve(list);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getContactsInList = async (listId, opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = { ..._baseOptions, ...defaults, ...opts };
    const contacts = await createRequest(
      constants.api.contactsList.contactsByListId,
      { listId },
      mergedProps
    );
    return Promise.resolve(contacts);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default function contactsListsApi(baseOptions) {
  _baseOptions = baseOptions;
  // API
  return {
    /**
     * Get contact list by ID
     * @async
     * @memberof hs/contactsLists
     * @method getById
     * @param {int} list The id of the list to retrieve
     * @example
     * const hs = new HubspotClient(props);
     * hs.contactsList.getById(123412313).then(response => console.log(response))
     * @returns {Promise}
     */
    getById,
        /**
     * Get contacts in list
     * @async
     * @memberof hs/contactsLists
     * @method getContactsInList
     * @param {int} list The id of the list to retrieve
     * @param {object} properties Optional extra properties to add to the request - see {@link https://developers.hubspot.com/docs/methods/lists/get_list_contacts|developer docs}
     * @example
     * const hs = new HubspotClient(props);
     * hs.contactsList.getContactsInList(123412313).then(response => console.log(response))
     * @returns {Promise}
     */
    getContactsInList
  };
}
