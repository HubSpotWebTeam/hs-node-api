import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createTable = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const {
      name,
      useForPages,
      columns,
      publishedAt
    } = opts;

    const body = {
      name,
      useForPages,
      columns,
      publishedAt
    };

    const method = 'POST';
    const url = constants.api.hubdb.tables;
    const options = { method, body };

    const mergedProps = { ...defaults, ..._baseOptions };
    const create = await createRequest(url, options, mergedProps);

    return Promise.resolve(create);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTables = async () => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = { ...defaults, ..._baseOptions };
    const tables = await createRequest(
      constants.api.hubdb.tables,
      {},
      mergedProps
    );

    return Promise.resolve(tables);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTableRows = async (tableId, portalId, opts = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = {
      ...defaults,
      ..._baseOptions,
      ...opts,
      ...additionalOpts
    };

    const rows = await createRequest(
      constants.api.hubdb.rows,
      { tableId },
      mergedProps
    );

    return Promise.resolve({ published: true, rows });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const publishTable = async tableId => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = { ...defaults, ..._baseOptions };
    const method = 'PUT';
    const table = await createRequest(
      constants.api.hubdb.publishTable,
      { tableId, method },
      mergedProps
    );

    return Promise.resolve(table);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTableById = async (tableId, portalId, options = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = {
      ...defaults,
      ..._baseOptions,
      ...options,
      ...additionalOpts
    };

    const table = await createRequest(
      constants.api.hubdb.table,
      { tableId },
      mergedProps
    );

    return Promise.resolve(table);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const addTableRow = async (tableId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'POST';
    const url = constants.api.hubdb.rows;
    const options = { tableId, method, body };

    const mergedProps = { ...defaults, ..._baseOptions };
    const add = await createRequest(url, options, mergedProps);

    return Promise.resolve(add);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const updateTableRow = async (tableId, rowId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'PUT';
    const url = constants.api.hubdb.row;
    const options = {
      tableId,
      id: rowId,
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

const updateTableRows = async (tableId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'POST';
    const url = constants.api.hubdb.rowsBatchUpdate;
    const options = {
      tableId,
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

const deleteTableRow = async (tableId, rowId, body = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'DELETE';
    const url = constants.api.hubdb.row;
    const options = {
      tableId,
      id: rowId,
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

export default function hubdbApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create a new HubDB table
     * @async
     * @memberof hs/hubdb
     * @method createTable
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.createTable(opts).then(response => console.log(response));
     * @property {string} opts.name
     * @property {boolean} opts.useForPages
     * @property {array} opts.columns
     * @property {int} opts.publishedAt
     * @returns {Promise}
     */
    createTable,
    /**
     * Get a collection of HubDB tables
     * @async
     * @memberof hs/hubdb
     * @method getTables
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTables(opts).then(response => console.log(response));
     * @returns {Promise}
     */
    getTables,
    /**
     * Get rows in a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method getTableRows
     * @param {int} tableId
     * @param {int} portalId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTableRows(tableId, portalId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableRows,
    /**
     * Retrieve HubDB table by ID
     * @async
     * @memberof hs/hubdb
     * @method getTableById
     * @param {int} tableId
     * @param {int} portalId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTableById(tableId, portalId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableById,
    /**
     * Add row to a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method addTableRow
     * @param {int} tableId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.addTableRow(tableId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    addTableRow,
    /**
     * Update row in a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method updateTableRow
     * @param {int} tableId
     * @param {int} rowId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.updateTableRow(tableId, rowId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    updateTableRow,
    /**
     * Batch update in a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method updateTableRow
     * @param {int} tableId
     * @param {object} options
     * @param {array} rows The rows to update
     * @example
     * const hs = new HubSpotClient(props);
     * const options = {
     * rows: [
     * {
        id: 1234567,
        createdAt: 1000000000,
        path: 'test',
        name: 'Test',
        values: {
          '2': 'Some data',
          '3': 'None',
        }
      },
      ...more rows
      ]}
     * hs.hubdb.updateTableRows(tableId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    updateTableRows,
    /**
     * Delete row from a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method deleteTableRow
     * @param {int} tableId
     * @param {int} rowId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.deleteTableRow(tableId, rowId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    deleteTableRow,
    /**
     * Publish a draft table
     * @async
     * @memberof hs/hubdb
     * @method publishTable
     * @param {int} tableId
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.publishTable(tableId).then(response => console.log(response))
     * @returns {Promise}
     */
    publishTable
  };
}
