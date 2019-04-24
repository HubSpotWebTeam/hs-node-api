import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getAll = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const { limit, offset, properties, propertiesWithHistory } = opts;

    const allowedProps = { limit, offset, properties, propertiesWithHistory };
    const mergedProps = Object.assign({}, defaults, _baseOptions, allowedProps);

    const allDeals = await createRequest(
      constants.api.deals.getAll,
      {},
      mergedProps
    );

    return Promise.resolve(allDeals);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getRecentlyCreated = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const { count, offset, since, includePropertyVersions } = opts;

    const allowedProps = { count, offset, since, includePropertyVersions };
    const mergedProps = Object.assign({}, defaults, _baseOptions, allowedProps);
    const recentlyCreatedDeals = await createRequest(
      constants.api.deals.recentlyCreated,
      {},
      mergedProps
    );
    return Promise.resolve(recentlyCreatedDeals);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createOrUpdate = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const { id, properties, associations } = opts;

    let method = 'POST';
    let url = constants.api.deals.create;
    const body = { properties, associations };
    const options = { method, body };
    if (id) {
      method = 'PUT';
      url = constants.api.deals.update;
      Object.assign(options, { method, id });
    }
    const deal = await createRequest(url, options, mergedProps);
    return Promise.resolve(deal);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const batchUpdate = async updates => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const method = 'POST';
    const url = constants.api.deals.batchUpdate;
    await createRequest(url, { method, body: updates }, mergedProps);
    return Promise.resolve({ updated: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function deals(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get recently created deals
     * @async
     * @memberof hs/deals
     * @method getRecentlyCreated
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.deals.getRecentlyCreated({
     *   count: 50,
     *   offset: 5,
     *   includePropertyVersions: true,
     *   since: 1463680280365
     * }).then(response => console.log(response));
     * @property {int} opts.count
     * @property {int} opts.offset
     * @property {int} opts.since
     * @property {boolean} opts.includePropertyVersions
     * @returns {Promise}
     */
    getRecentlyCreated,
    /**
     * Get all deals
     * @async
     * @memberof hs/deals
     * @method getAll
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.deals.getRecentlyCreated({
     *   limit: 2,
     *   offset: 12356,
     *   properties: ['dealname', 'pipeline'],
     *   propertiesWithHistory: ['dealstage']
     * }).then(response => console.log(response));
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {array} opts.properties
     * @property {array} opts.propertiesWithHistory
     * @returns {Promise}
     */
    getAll,
    /**
     * Update a group of deals
     * @async
     * @memberof hs/deals
     * @method batchUpdate
     * @param {array} updates Array of objects. objectId corresponds with a dealId. See Example below.
     * @example
     * const hs = new HubspotClient(props);
     * const updates = [{
     *  "objectId": 93630457,
     *  "properties": [
     *    {
     *      "name": "dealname",
     *      "value": "Updated Deal Name"
     *    },
     *    {
     *      "name": "dealname",
     *      "value": "Updated Deal Name"
     *    }
     *  ]},
     *  {
     *  "objectId": 26448234,
     *  "properties": [
     *    {
     *      "name": "amount",
     *      "value": "2000"
     *    }
     *  ]
     * }]);
     * hs.deals.batchUpdate(updates).then(response => console.log(response));
     * @returns {Promise}
     * If successful the promise will resolve with { updated: true }. Otherwise the promise will resolve with an error message.
     */
    batchUpdate,
    /**
     * Create or update a deal
     * @async
     * @memberof hs/deals
     * @method createOrUpdate
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * const updatedDealOpts = {
     *   id:93630457,
     *   properties: [
     *   {
     *     value: 'Update Deal Name',
     *     name: 'dealname'
     *   },
     *   {
     *     value: '200000',
     *     name: 'amount'
     *   }
     * ]};
     * hs.deals.createOrUpdate(updatedDealOpts).then(response => console.log(response));
     * const newDealOpts = {
     * associations: {
     *   associatedCompanyIds: 53333385
     * },
     * properties: [
     *   {
     *     value: 'Big Deal',
     *     name: 'dealname'
     *   },
     *   {
     *     value: 'appointmentscheduled',
     *     name: 'dealstage'
     *   },
     *   {
     *     value: 'default',
     *     name: 'pipeline'
     *   },
     *   {
     *     value: 1409443200000,
     *     name: 'closedate'
     *   },
     *   {
     *     value: '60000',
     *     name: 'amount'
     *   },
     *   {
     *     value: 'newbusiness',
     *     name: 'dealtype'
     *   }
     * ]
     *};
     * hs.deals.createOrUpdate(newDealOpts).then(response => console.log(response));
     * @property {int} opts.id
     * @property {array} opts.properties
     * @property {array} opts.associations
     * @property {boolean} opts.includePropertyVersions
     * @returns {Promise}
     */
    createOrUpdate
  };
}
