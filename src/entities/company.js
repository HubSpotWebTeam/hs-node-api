// NOTE: FULLY_IMPLEMENTED
// NOTE: REQUIRES_TESTS

import { createRequest, sanitizeObject } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

// await hs.company.create({ name: 'Hubspot', no_of_employees: 1000 })

const create = async (properties) => {
  try {
    const method = 'POST';
    const body = {
      properties: Object.keys(properties).map(key => ({
        name: key,
        value: properties[key]
      }))
    };
    const response = await createRequest(constants.api.company.create, { method, body },
      _baseOptions);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const update = async (companyId, properties) => {
  try {
    if (!companyId) {
      throw new Error('Field "companyId" is required.');
    }

    const method = 'PUT';
    const body = {
      properties: Object.keys(properties).map(key => ({
        name: key,
        value: properties[key]
      }))
    };

    const response = await createRequest(constants.api.company.byId, { method, body, companyId },
      _baseOptions);

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const batchUpdate = async (options) => {
  // FIXME: Implement this
  try {
    const method = 'POST';
    const body = options.map(company => {
      const properties = Object.keys(company.updates).map(i => ({
        name: i,
        value: company.updates[i]
      }));
      return {
        objectId: company.id,
        properties
      };
    });

    await createRequest(constants.api.company.batchUpdate, { method, body },
      _baseOptions);
    return Promise.resolve({ msg: 'Successfully updated company properties' });
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteCompany = async (companyId) => {
  try {
    const method = 'DELETE';
    const response = await createRequest(constants.api.company.byId, { method, companyId },
      _baseOptions);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getAll = async (props) => {
  try {
    const method = 'GET';
    const passedProps = props || {};
    const { limit, offset, properties, propertiesWithHistory } = passedProps;
    let mergedProps = Object.assign({}, defaults, _baseOptions, { limit, offset, properties, propertiesWithHistory });
    mergedProps = sanitizeObject(mergedProps);
    // console.log(mergedProps);
    // return Promise.resolve();

    const companies = await createRequest(constants.api.company.byId, { method, companyId: 'paged' }, mergedProps);
    return Promise.resolve(companies);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getRecentlyModified = async (props) => {
  try {
    const method = 'GET';
    const passedProps = props || {};
    const { offset, count } = passedProps;
    let mergedProps = Object.assign({}, defaults, _baseOptions, { offset, count });
    mergedProps = sanitizeObject(mergedProps);
    const companies = await createRequest(constants.api.company.byId, { method, companyId: 'recent/modified' },
      mergedProps);
    return Promise.resolve(companies);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getRecentlyCreated = async (props) => {
  try {
    const method = 'GET';
    const passedProps = props || {};
    const { offset, count } = passedProps;
    let mergedProps = Object.assign({}, defaults, _baseOptions, { offset, count });
    mergedProps = sanitizeObject(mergedProps);
    const companies = await createRequest(constants.api.company.byId, { method, companyId: 'recent/created' },
      mergedProps);
    return Promise.resolve(companies);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const byDomain = async (domain, props) => {
  try {
    const method = 'POST';
    const passedProps = props || {};
    let { limit, properties, offset } = passedProps;
    if (!properties) {
      properties = [
        'domain',
        'createdate',
        'name',
        'hs_lastmodifieddate'
      ];
    }
    if (!offset) {
      offset = 0;
    }

    let body = {
      limit,
      requestOptions: { properties },
      offset: {
        isPrimary: true,
        companyId: offset
      }
    };
    body = sanitizeObject(body);
    let mergedProps = Object.assign({}, defaults, _baseOptions);
    mergedProps = sanitizeObject(mergedProps);
    // return Promise.resolve(JSON.stringify(body));
    const companies = await createRequest(constants.api.company.byDomain, { method, domain, body }, mergedProps);
    return Promise.resolve(companies);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = function calendar(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create a company with properties
     * @async
     * @memberof hs/company
     * @method create
     * @param {object} companyProperties An object containing company properties in key/value format. At least 1 property is required
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.create({ name: 'Foobar' })
     * @returns {Promise}
     */
    create,
    /**
     * Update a company with properties
     * @async
     * @memberof hs/company
     * @method update
     * @param {number} companyId The ID of the company you wih to update
     * @param {object} companyProperties An object containing company properties in key/value format. At least 1 property is required
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.update(companyId, companyProperties)
     * @returns {Promise}
     */
    update,
    /**
     * Update multiple companies with properties
     * @async
     * @memberof hs/company
     * @method batchUpdate
     * @param {array} updates Updates to be actioned (see example below)
     * @example
     * const hs = new HubspotClient(props);
     * const updates = [{
     *    id: 1234,
     *    updates: { name: 'Something else' }
     *  },
     * {
     *    id: 5678,
     *    updates: { name: 'Blah blah', ownerId: 12341231 }
     * }];
     * const response = hs.company.batchUpdate(updates)
     * @returns {Promise}
     */
    batchUpdate,
    /**
     * Delete company
     * @async
     * @memberof hs/company
     * @method delete
     * @param {number} companyId Id of company to delete
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.delete(companyId);
     * @returns {Promise}
     */
    delete: deleteCompany,
    /**
     * Retrieve all companies (max 250 at a time)
     * @async
     * @memberof hs/company
     * @method getAll
     * @param {object} pagingProperties Paging criteria for the current request
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.getAll(pagingProperties)
     * @property {number} [pagingProperties.limit] - The number of records to return. Defaults to 100, has a maximum value of 250.
     * @property {number} [pagingProperties.offset] - Used to page through the results. If there are more records in your portal than the limit= parameter, you will need to use the offset returned in the first request to get the next set of results.
     * @property {array} [pagingProperties.properties] - Used to include specific company properties in the results.  By default, the results will only include the company ID, and will not include the values for any properties for your companies. Including this parameter will include the data for the specified property in the results.
     * @property {array} [pagingProperties.propertiesWithHistory] - Works similarly to pagingProperties.properties, but this parameter will include the history for the specified property, instead of just including the current value. Use this parameter when you need the full history of changes to a property's value.
     * @returns {Promise}
     */
    getAll,
    /**
     * This endpoint will only return records modified in the last 30 days, or the 10k most recently modified records.
     * @async
     * @memberof hs/company
     * @method getRecentlyModified
     * @param {object} pagingProperties Paging criteria for the current request
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.getRecentlyModified({count: 5})
     * @property {number} [pagingProperties.count] - Specifies the number of companies to be returned.
     * @property {number} [pagingProperties.offset] - This is used to get the next page of results. Each request will return an offset in the response, and you'd use that offset in the URL of your next request to get the next page of results.
     * @returns {Promise}
     */
    getRecentlyModified,
    /**
     * This endpoint will only return records created in the last 30 days, or the 10k most recently created records.
     * @async
     * @memberof hs/company
     * @method getRecentlyCreated
     * @param {object} pagingProperties Paging criteria for the current request
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.getRecentlyCreated({count: 5})
     * @property {number} [pagingProperties.count] - Specifies the number of companies to be returned.
     * @property {number} [pagingProperties.offset] - This is used to get the next page of results. Each request will return an offset in the response, and you'd use that offset in the URL of your next request to get the next page of results.
     * @returns {Promise}
     */
    getRecentlyCreated,
    /**
     * Search for companies by domain name.
     * @async
     * @memberof hs/company
     * @method byDomain
     * @param {string} domain Domain name to search for
     * @param {object} pagingProperties Paging & property criteria for the current request
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.company.byDomain('www.hubspot.com', {limit: 5, properties: ['name', 'createdate']})
     * @property {number} [pagingProperties.limit] - The number of records to return in a single request. Supports values up to 100.
     * @property {number} [pagingProperties.offset=0] - Each response will include a hasMore value and an offset object. If hasMore is true, then you would use the offset object in the next request to get the next set of results.
     * @property {array} [pagingProperties.properties=["domain", "createdate", "name", "hs_lastmodifieddate"]] - An array of properties that will be included for the returned companies. By default, no properties will be included in the response, so you must specify any properties that you want.
     * @returns {Promise}
     */
    byDomain
  };
};
