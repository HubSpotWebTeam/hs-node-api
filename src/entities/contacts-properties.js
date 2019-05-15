import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const debug = require('debug')('hubspot-api:tests'); // eslint-disable-line

const defaults = {
};
let _baseOptions;

const getAllContactsProperties = async() => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const contactsProperties = await createRequest(
      constants.api.contactsProperties.getAllContactsProperties,
      {},
      mergedProps
    );
    return Promise.resolve(contactsProperties);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default function contactsProperties(baseOptions) {
  _baseOptions = baseOptions;
  // API
  return {
    /**
     * Get all contact properties
     * @async
     * @memberof hs/contactsProperties
     * @method getAllContactsProperties
     * @example
     * const hs = new HubspotClient(props);
     * hs.contactsProperties.getAllContactsProperties().then(response => console.log(response))
     * @returns {Promise}
     */
    getAllContactsProperties
  };
}
