import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createTable = async (opts = {}) => {
  try {
    const { name, useForPages, columns, publishedAt } = opts;

    const body = {
      name,
      useForPages,
      columns,
      publishedAt
    };

    const method = 'POST';
    const url = constants.api.hubdb.tables;
    const options = { method, body };

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const create = await createRequest(url, options, mergedProps);

    return Promise.resolve(create);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTables = async (opts = {}) => {
  try {
    const { limit, offset, deleted, updatedAt, createdAt } = opts;
    let additionalOpts = {
      limit,
      offset,
      deleted,
      updatedAt,
      createdAt
    };

    // Extract additional dynamic querystring params and values.
    additionalOpts = queryStringParamInterpolator(
      {
        createdAt,
        updatedAt
      },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );

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

const getTableById = async (tableId, portalId, options = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      options,
      additionalOpts
    );

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

const getTableRows = async (tableId, portalId, options = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      options,
      additionalOpts
    );

    const table = await createRequest(
      constants.api.hubdb.rows,
      { tableId },
      mergedProps
    );

    return Promise.resolve(table);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function hubdbApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create a new page or update an existing page
     * @async
     * @memberof hs/hubdb
     * @method createTable
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.createTable(opts).then(response => console.log(response));
     * @property {int} opts.id If set, this will update the page with the corresponding ID.
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
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTables(opts).then(response => console.log(response));
     * @property {string} opts.limit
     * @property {string} opts.offset
     * @returns {Promise}
     */
    getTables,
    /**
     * Remove a page
     * @async
     * @memberof hs/pages
     * @method deleteTable
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.deleteTable(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableRows,
    // deleteTable,
    /**
     * Retrieve or update hubdb table by ID
     * @async
     * @memberof hs/hubdb
     * @method getTableById
     * @param {int} tableId
     * @param {int} portalId
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTableById(tableId, portalId).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableById
    /**
     * Update the autosave buffer for a page
     * @async
     * @memberof hs/pages
     * @method updateAutosaveBuffer
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.updateAutosaveBuffer(opts).then(response => console.log(response))
     * @property {string} opts.campaign
     * @property {string} opts.campaign_name
     * @property {string} opts.footer_html
     * @property {string} opts.head_html
     * @property {boolean} opts.is_draft
     * @property {string} opts.meta_description
     * @property {string} opts.meta_keywords
     * @property {string} opts.name
     * @property {string} opts.password
     * @property {long} opts.publish_date
     * @property {boolean} opts.publish_immediately
     * @property {string} opts.slug
     * @property {string} opts.subcategory
     * @property {string} opts.widget_containers
     * @property {string} opts.widgets
     * @returns {Promise}
     */
    // updateAutosaveBuffer,
    /**
     * Retrieve page autosave buffer contents
     * @async
     * @memberof hs/pages
     * @method getTableAutosaveBuffer
     * @param {int} pageId
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.getTableAutosaveBuffer(pageId).then(response => console.log(response))
     * @returns {Promise}
     */
    // getTableAutosaveBuffer,
    /**
     * Clones a page
     * @async
     * @memberof hs/pages
     * @method cloneTable
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.cloneTable(id).then(response => console.log(response))
     * @returns {Promise}
     */
    // cloneTable,
    /**
     * Determine if the auto-save buffer differs from the live page
     * @async
     * @memberof hs/pages
     * @method hasBufferedChanges
     * @param {int} pageId
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.hasBufferedChanges(pageId).then(response => console.log(response))
     * @returns {Promise}
     */
    // hasBufferedChanges,
    /**
     * Carries out a publish action with the current page. Check out {@link https://developers.hubspot.com/docs/methods/pages/post_pages_page_id_publish_action|the developer docs} for further info.
     * @async
     * @memberof hs/pages
     * @method doPublishAction
     * @param {int} pageId
     * @param {string} publishAction One of `push-buffer-live`, `schedule-publish` or `cancel-publish`
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.doPublishAction(pageId, publishAction).then(response => console.log(response))
     * @returns {Promise}
     */
    // doPublishAction,
    /**
     * Copies the contents of the auto-save buffer into the live Table
     * @async
     * @memberof hs/pages
     * @method pushBufferLive
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.pushBufferLive(id).then(response => console.log(response))
     * @returns {Promise}
     */
    // pushBufferLive,
    /**
     * Restores a previously deleted Table
     * @async
     * @memberof hs/pages
     * @method restoreDeleted
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.restoreDeleted(id).then(response => console.log(response))
     * @returns {Promise}
     */
    // restoreDeleted,
    /**
     * Validates the auto-save buffer version of the Table
     * @async
     * @memberof hs/pages
     * @method validateTableAutoSaveBuffer
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.validateTableAutoSaveBuffer(id).then(response => console.log(response))
     * @returns {Promise}
     */
    // validateTableAutoSaveBuffer,
    /**
     * List previous versions of a Table
     * @async
     * @memberof hs/pages
     * @method getTableVersions
     * @param {int} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.getTableVersions(id).then(response => console.log(response))
     * @returns {Promise}
     */
    // getTableVersions,
    /**
     * Restore a previous version of a Table
     * @async
     * @memberof hs/pages
     * @method restoreTableVersion
     * @param {int} pageId
     * @param {int} versionId
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.restoreTableVersion(pageId, versionId).then(response => console.log(response))
     * @returns {Promise}
     */
    // restoreTableVersion
  };
}
