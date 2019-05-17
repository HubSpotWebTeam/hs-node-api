import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const updateEmailSubscription = async (email, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    if (!email) {
      throw new Error('Email is a required field');
    }

    const mergedProps = { ...defaults, ..._baseOptions };
    const updateStatus = await createRequest(
      constants.api.emailSubscriptions.updateStatus,
      { body, method: 'PUT', email },
      mergedProps
    );
    return Promise.resolve(updateStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getEmailSubscriptionStatus = async (email, portalId) => {
  try {
    requiresAuthentication(_baseOptions);

    if (!email || !portalId) {
      throw new Error('Email / Portal ID are required fields');
    }

    const mergedProps = { ...defaults, ..._baseOptions };
    const status = await createRequest(
      constants.api.emailSubscriptions.getStatus,
      { email, portalId },
      mergedProps
    );
    return Promise.resolve(status);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function emailSubscriptions(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Update the email subscription status for an email address (https://developers.hubspot.com/docs/methods/email/update_status)
     * @async
     * @memberof hs/emailSubscriptions
     * @method updateEmailSubscription
     * @param {string} email
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.emailSubscriptions.updateEmailSubscription(email, { unsubscribeFromAll: true}).then(response => console.log(response));
     * @returns {Promise}
     */
    updateEmailSubscription,
    /**
     * Get the email subscription status for an email address / portal ID combination (https://developers.hubspot.com/docs/methods/email/get_status)
     * @async
     * @memberof hs/emailSubscriptions
     * @method getEmailSubscriptionStatus
     * @param {string} email
     * @param {string} portalId
     * @example
     * const hs = new HubspotClient(props);
     * hs.emailSubscriptions.getEmailSubscriptionStatus(email, 198273).then(response => console.log(response));
     * @returns {Promise}
     */
    getEmailSubscriptionStatus
  };
}
