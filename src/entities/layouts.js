import createRequest, {
  queryStringParamInterpolator,
  requiresAuthentication
} from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getLayouts = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const {
      limit,
      offset,
      category_id,
      created,
      deleted_at,
      id,
      label,
      path,
      custom_head,
      include_default_custom_css,
      enable_domain_stylesheet,
      attached_stylesheets
    } = opts;
    let additionalOpts = {
      limit,
      offset,
      category_id,
      created,
      deleted_at,
      id,
      label,
      path,
      custom_head,
      include_default_custom_css,
      enable_domain_stylesheet,
      attached_stylesheets
    };
    // Extract additional dynamic querystring params and values.
    additionalOpts = queryStringParamInterpolator(
      {
        created
      },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const layouts = await createRequest(
      constants.api.layouts.getAll,
      {},
      mergedProps
    );
    return Promise.resolve(layouts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getLayout = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('getLayout requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const layoutInfo = await createRequest(
      constants.api.layouts.byId,
      { id },
      mergedProps
    );
    return Promise.resolve(layoutInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getLayoutBuffer = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('getLayoutBuffer requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const layoutBuffer = await createRequest(
      constants.api.layouts.getBuffer,
      { id },
      mergedProps
    );
    return Promise.resolve(layoutBuffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const hasBufferedChanges = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('hasBufferedChanges requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const result = await createRequest(
      constants.api.layouts.hasBufferedChanges,
      { id },
      mergedProps
    );
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPreviousLayoutVersions = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('getPreviousLayoutVersions requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const previousVersions = await createRequest(
      constants.api.layouts.getPreviousVersions,
      { id },
      mergedProps
    );
    return Promise.resolve(previousVersions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPreviousLayoutVersion = async ({ id, versionId }) => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id || !versionId) {
      throw new Error('getPreviousLayoutVersion requires the first argument to contain both keys for `id` & `versionId`');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const previousVersions = await createRequest(
      constants.api.layouts.getPreviousVersions,
      { id, versionId },
      mergedProps
    );
    return Promise.resolve(previousVersions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function layoutsApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get all layouts for a portal
     * @async
     * @memberof hs/layouts
     * @method getLayouts
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.layouts.getLayouts(opts).then(response => console.log(response));
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {int} opts.category_id
     * @property {int} opts.created
     * @property {int} opts.deleted_at
     * @property {int} opts.id
     * @property {string} opts.label Find layouts matching this label.
     * @property {string} opts.path
     * @property {string} opts.custom_head
     * @property {boolean} opts.include_default_custom_css
     * @property {boolean} opts.enable_domain_stylesheet
     * @property {string} opts.attached_stylesheets
     * @returns {Promise}
     */
    getLayouts,
    /**
     * Get layout info by ID
     * @async
     * @memberof hs/layouts
     * @method getLayout
     * @param {int} layoutId
     * @example
     * const hs = new HubspotClient(props);
     * hs.layouts.getLayout(layoutId).then(response => console.log(response));
     * @returns {Promise}
     */
    getLayout,
    /**
     * Gets the current contents of the auto-save buffer
     * @async
     * @memberof hs/layouts
     * @method getLayoutBuffer
     * @param {int} layoutId
     * @example
     * const hs = new HubspotClient(props);
     * hs.layout.getLayoutBuffer(layoutId).then(response => console.log(response));
     * @return {Promise}
     */
    getLayoutBuffer,
    /**
     * Returns a dictionary: {"has_changes": false/true} depending on if the buffer is different from the live object.
     * @async
     * @memberof hs/layouts
     * @method hasBufferedChanges
     * @param {int} layoutId
     * @example
     * const hs = new HubspotClient(props);
     * hs.layout.hasBufferedChanges(layoutId).then(response => console.log(response));
     * @return {Promise}
     */
    hasBufferedChanges,
    /**
     * Get the previous revisions for a specific layout, specified by ID.
     * @async
     * @memberof hs/layouts
     * @method getPreviousLayoutVersions
     * @param {int} layoutId
     * @example
     * const hs = new HubspotClient(props);
     * hs.layout.getPreviousLayoutVersions(layoutId).then(response => console.log(response));
     * @return {Promise}
     */
    getPreviousLayoutVersions,
    /**
     * Get a specific revision of a specific layout. Version id is the id of the version from the list previous versions endpoint
     * @async
     * @memberof hs/layouts
     * @method getPreviousLayoutVersion
     * @param {object} opts
     * @param {int} opts.id - layoutId
     * @param {int} opts.versionId - id of the versionm from the list previous versions endpoint
     * @example
     * const hs = new HubspotClient(props);
     * hs.layout.getPreviousLayoutVersion({ id , versionId }).then(response => console.log(response));
     * @return {Promise}
     */
    getPreviousLayoutVersion,
  };
}
