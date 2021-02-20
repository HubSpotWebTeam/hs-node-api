import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getSubscriptions = async (appId) => {
  try {
    requiresAuthentication(_baseOptions);

    const mergedProps = { ...defaults, ..._baseOptions };

    const subscriptions = await createRequest(
      constants.api.webhooks.getAll,
      { appId },
      mergedProps
    );
    return Promise.resolve(subscriptions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createSubscription = async (appId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'POST';
    const url = constants.api.webhooks.create;
    const options = {
      appId,
      method,
      body
    };

    const mergedProps = { ...defaults, ..._baseOptions };
    const create = await createRequest(url, options, mergedProps);

    return Promise.resolve(create);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const updateSubscription = async (appId, subscriptionId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'PUT';
    const url = constants.api.webhooks.update;
    const options = {
      appId,
      id: subscriptionId,
      method,
      body
    };

    const mergedProps = { ...defaults, ..._baseOptions };
    const update = await createRequest(url, options, mergedProps);

    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteSubscription = async (appId, subscriptionId) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'DELETE';
    const url = constants.api.webhooks.delete;
    const options = {
      appId,
      id: subscriptionId,
      method
    };

    const mergedProps = { ...defaults, ..._baseOptions };
    const del = await createRequest(url, options, mergedProps);

    return Promise.resolve(del);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function webhooksApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Retrieve all webhook subscriptions for given appId
     * @async
     * @memberof hs/getSubscriptions
     * @method getSubscriptions
     *
     * @param {number} appId The app id
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.webhooks.getSubscriptions(123456789).then(response => console.log(response))
     */
    getSubscriptions,
    /**
     * Create new webhook subscription
     * @async
     * @memberof hs/createSubscription
     * @method getFolders
     *
     * @param {number} appId The appId
     * @param {object} payload Subscription body
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.webhooks.createSubscription(123456789, {
     * {
     *   "subscriptionDetails": {
     *     "subscriptionType": "company.propertyChange",
     *     "propertyName": "companyname"
     *   },
     *   "enabled": false
     * }
     * }).then(response => console.log(response))
     */
    createSubscription,
    /**
     * Create new webhook subscription
     * @async
     * @memberof hs/createSubscription
     * @method getFolders
     *
     * @param {number} appId The appId
     * @param {number} subscriptionId The subscriptionId
     * @param {object} payload Subscription body
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.webhooks.updateSubscription(123456789, 123, {
     * {
     *   "enabled": false
     * }
     * }).then(response => console.log(response))
     */
    updateSubscription,
    /**
     * Create new webhook subscription
     * @async
     * @memberof hs/createSubscription
     * @method getFolders
     *
     * @param {number} appId The appId
     * @param {number} subscriptionId The subscription id
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.webhooks.deleteSubscription(123456789, 123)
     * .then(response => console.log(response))
     */
    deleteSubscription
  };
}
