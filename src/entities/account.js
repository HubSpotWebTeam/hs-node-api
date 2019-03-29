import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const debug = require('debug')('hubspot-api:tests'); // eslint-disable-line

const defaults = {};
let _baseOptions;

const getAccountDetails = async () => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const accountDetails = await createRequest(
      constants.api.account.details,
      {},
      mergedProps
    );
    return Promise.resolve(accountDetails);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getDailyLimit = async () => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const dailyLimit = await createRequest(
      constants.api.account.dailyLimit,
      {},
      mergedProps
    );
    return Promise.resolve(dailyLimit);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default function accounts(baseOptions) {
  _baseOptions = baseOptions;
  // API
  return {
    /**
     * Get account info
     * @async
     * @memberof hs/account
     * @method getAccountDetails
     * @example
     * const hs = new HubspotClient(props);
     * const accountDetails = await hs.account.getAccountDetails();
     * @returns {Promise}
     */
    getAccountDetails,
    /**
     * Check to see how many API calls have been made for a portal for the current day as well as the time that the limit will reset
     * @async
     * @memberof hs/account
     * @method getDailyLimit
     * @example
     * const hs = new HubspotClient(props);
     * const dailyLimit = await hs.account.getDailyLimit();
     * @returns {Promise}
     */
    getDailyLimit
  };
}
