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
    const additionalOpts = {
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
    Object.assign(
      additionalOpts,
      queryStringParamInterpolator({
        created,
        deleted_at,
        name,
        publish_date,
        updated
      })
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
     * const response = hs.pages.createOrUpdatePage(opts);
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
     * const response = hs.pages.getPages(opts);
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
     * @method deletPage
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * const events = hs.pages.deletPage(id)
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
     * const events = hs.pages.getPageById(id)
     * @returns {Promise}
     */
    getPageById
  };
}
