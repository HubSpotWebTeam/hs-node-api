import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getLayouts = async (opts = {}) => {
  try {
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
    getLayout
  };
}
