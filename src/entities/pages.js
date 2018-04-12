import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createOrUpdatePage = async (opts = {}) => {
  try {
    const {
      id,
      campaign,
      campaign_name,
      footer_html,
      head_html,
      is_draft,
      meta_description,
      meta_keywords,
      name,
      password,
      publish_date,
      publish_immediately,
      slug,
      subcategory,
      widget_containers,
      widgets
    } = opts;

    const body = {
      campaign,
      campaign_name,
      footer_html,
      head_html,
      is_draft,
      meta_description,
      meta_keywords,
      name,
      password,
      publish_date,
      publish_immediately,
      slug,
      subcategory,
      widget_containers,
      widgets
    };

    let method = 'POST';
    let url = constants.api.pages.create;
    const options = { method, body };
    if (id) {
      method = 'PUT';
      url = constants.api.pages.byId;
      Object.assign(options, { method, id });
    }

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const update = await createRequest(url, options, mergedProps);

    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPages = async (opts = {}) => {
  try {
    const {
      limit,
      offset,
      ab_test_id,
      archived,
      campaign,
      created,
      deleted_at,
      id,
      is_draft,
      name,
      publish_date,
      slug,
      subcategory,
      updated
    } = opts;
    let additionalOpts = {
      limit,
      offset,
      ab_test_id,
      archived,
      campaign,
      created,
      deleted_at,
      id,
      is_draft,
      name,
      publish_date,
      slug,
      subcategory,
      updated
    };

    // Extract additional dynamic querystring params and values.
    additionalOpts = queryStringParamInterpolator(
      {
        created,
        deleted_at,
        name,
        publish_date,
        updated
      },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );

    const pages = await createRequest(
      constants.api.pages.list,
      {},
      mergedProps
    );
    return Promise.resolve(pages);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deletePage = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.pages.byId,
      { id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPageById = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const page = await createRequest(
      constants.api.pages.byId,
      { id },
      mergedProps
    );
    return Promise.resolve(page);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const updateAutosaveBuffer = async (opts = {}) => {
  try {
    const {
      id,
      campaign,
      campaign_name,
      footer_html,
      head_html,
      is_draft,
      meta_description,
      meta_keywords,
      name,
      password,
      publish_date,
      publish_immediately,
      slug,
      subcategory,
      widget_containers,
      widgets
    } = opts;

    if (!id) {
      throw new Error('No page ID specified');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = {
      campaign,
      campaign_name,
      footer_html,
      head_html,
      is_draft,
      meta_description,
      meta_keywords,
      name,
      password,
      publish_date,
      publish_immediately,
      slug,
      subcategory,
      widget_containers,
      widgets
    };
    const method = 'PUT';
    const buffer = await createRequest(
      constants.api.pages.buffer,
      { id, method, body },
      mergedProps
    );
    return Promise.resolve(buffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPageAutosaveBuffer = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const buffer = await createRequest(
      constants.api.pages.buffer,
      { id },
      mergedProps
    );
    return Promise.resolve(buffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const clonePage = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const method = 'POST';
    await createRequest(constants.api.pages.clone, { id, method }, mergedProps);
    return Promise.resolve({ cloned: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const hasBufferedChanges = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferedChanges = await createRequest(
      constants.api.pages.bufferedChanges,
      { id },
      mergedProps
    );
    return Promise.resolve(bufferedChanges);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const doPublishAction = async (id, action) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = { action };
    const method = 'POST';

    await createRequest(
      constants.api.pages.publishAction,
      { id, method, body },
      mergedProps
    );
    return Promise.resolve({ success: true, action });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const pushBufferLive = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.pages.pushBufferLive,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve({ success: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoreDeleted = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.pages.restoreDeleted,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve({ success: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const validatePageAutoSaveBuffer = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.pages.validateBuffer,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve({ success: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPageVersions = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const versions = await createRequest(
      constants.api.pages.versions,
      { id },
      mergedProps
    );
    return Promise.resolve(versions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restorePageVersion = async (id, version_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = { version_id };
    const method = 'POST';

    const versions = await createRequest(
      constants.api.pages.restoreVersion,
      { id, body, method },
      mergedProps
    );
    return Promise.resolve(versions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function pagesApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create a new page or update an existing page
     * @async
     * @memberof hs/pages
     * @method createOrUpdatePage
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.createOrUpdatePage(opts).then(response => console.log(response));
     * @property {string} opts.campaign
     * @property {string} opts.campaign_name
     * @property {string} opts.footer_html
     * @property {string} opts.head_html
     * @property {string} opts.is_draft
     * @property {string} opts.meta_description
     * @property {string} opts.meta_keywords
     * @property {string} opts.name
     * @property {string} opts.password
     * @property {long} opts.publish_date
     * @property {string} opts.publish_immediately
     * @property {string} opts.slug
     * @property {string} opts.subcategory
     * @property {string} opts.widget_containers
     * @property {string} opts.widgets
     * @returns {Promise}
     */
    createOrUpdatePage,
    /**
     * Get a collection of pages
     * @async
     * @memberof hs/pages
     * @method getPages
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.getPages(opts).then(response => console.log(response));
     * @property {string} opts.limit
     * @property {string} opts.offset
     * @property {string} opts.ab_test_id
     * @property {boolean} opts.archived
     * @property {string} opts.campaign
     * @property {string} opts.created
     * @property {string} opts.deleted_at
     * @property {int} opts.id
     * @property {boolean} opts.is_draft
     * @property {string} opts.name
     * @property {long} opts.publish_date
     * @property {string} opts.slug
     * @property {string} opts.subcategory
     * @property {string} opts.updated
     * @returns {Promise}
     */
    getPages,
    /**
     * Remove a page
     * @async
     * @memberof hs/pages
     * @method deletePage
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.deletePage(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deletePage,
    /**
     * Retrieve page info by ID
     * @async
     * @memberof hs/pages
     * @method getPageById
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.getPageById(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getPageById,
    /**
     * Update the autosave buffer for a page
     * @async
     * @memberof hs/pages
     * @method updateAutosaveBuffer
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
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
    updateAutosaveBuffer,
    /**
     * Retrieve page autosave buffer contents
     * @async
     * @memberof hs/pages
     * @method getPageAutosaveBuffer
     * @param {int} pageId
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.getPageAutosaveBuffer(pageId).then(response => console.log(response))
     * @returns {Promise}
     */
    getPageAutosaveBuffer,
    /**
     * Clones a page
     * @async
     * @memberof hs/pages
     * @method clonePage
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.clonePage(id).then(response => console.log(response))
     * @returns {Promise}
     */
    clonePage,
    /**
     * Determine if the auto-save buffer differs from the live page
     * @async
     * @memberof hs/pages
     * @method hasBufferedChanges
     * @param {int} pageId
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.hasBufferedChanges(pageId).then(response => console.log(response))
     * @returns {Promise}
     */
    hasBufferedChanges,
    /**
     * Carries out a publish action with the current page. Check out {@link https://developers.hubspot.com/docs/methods/pages/post_pages_page_id_publish_action|the developer docs} for further info.
     * @async
     * @memberof hs/pages
     * @method doPublishAction
     * @param {int} pageId
     * @param {string} publishAction One of `push-buffer-live`, `schedule-publish` or `cancel-publish`
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.doPublishAction(pageId, publishAction).then(response => console.log(response))
     * @returns {Promise}
     */
    doPublishAction,
    /**
     * Copies the contents of the auto-save buffer into the live Page
     * @async
     * @memberof hs/pages
     * @method pushBufferLive
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.pushBufferLive(id).then(response => console.log(response))
     * @returns {Promise}
     */
    pushBufferLive,
    /**
     * Restores a previously deleted Page
     * @async
     * @memberof hs/pages
     * @method restoreDeleted
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.restoreDeleted(id).then(response => console.log(response))
     * @returns {Promise}
     */
    restoreDeleted,
    /**
     * Validates the auto-save buffer version of the Page
     * @async
     * @memberof hs/pages
     * @method validatePageAutoSaveBuffer
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.validatePageAutoSaveBuffer(id).then(response => console.log(response))
     * @returns {Promise}
     */
    validatePageAutoSaveBuffer,
    /**
     * List previous versions of a Page
     * @async
     * @memberof hs/pages
     * @method getPageVersions
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.getPageVersions(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getPageVersions,
    /**
     * Restore a previous version of a Page
     * @async
     * @memberof hs/pages
     * @method restorePageVersion
     * @param {int} pageId
     * @param {int} versionId
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.restorePageVersion(pageId, versionId).then(response => console.log(response))
     * @returns {Promise}
     */
    restorePageVersion
  };
}
