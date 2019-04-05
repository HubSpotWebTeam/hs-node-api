import createRequest, {
  requiresAuthentication
} from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createOrUpdateUrlMapping = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const {
      routePrefix,
      destination,
      redirectStyle,
      isMatchFullUrl,
      isMatchQueryString,
      isOnlyAfterNotFound,
      isPattern,
      precedence
    } = opts;

    const body = {
      routePrefix,
      destination,
      redirectStyle,
      isMatchFullUrl,
      isMatchQueryString,
      isOnlyAfterNotFound,
      isPattern,
      precedence
    };

    let method = 'POST';
    let url = constants.api.urlMappings.create;

    const options = { method, body };
    if (id) {
      method = 'PUT';
      url = constants.api.urlMappings.byId;
      Object.assign(options, { method, id });
    }

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const update = await createRequest(url, options, mergedProps);

    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getUrlMappings = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const {
      limit,
      offset,
      id,
      routePrefix,
      destination
    } = opts;
    let additionalOpts = {
      limit,
      offset,
      id,
      routePrefix,
      destination
    };

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const urlMappings = await createRequest(
      constants.api.urlMappings.getAll,
      {},
      mergedProps
    );

    return Promise.resolve(urlMappings);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getUrlMappingById = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('getUrlMappingById requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const urlMapping = await createRequest(
      constants.api.urlMappings.byId,
      { id },
      mergedProps
    );
    return Promise.resolve(urlMapping);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteUrlMapping = async id => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.pages.byId,
      { url_mapping_id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function urlMappingApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
    * Create a new url mapping or update an existing url mapping
    * @memberof hs/urlMappings
    * @method createOrUpdateUrlMapping
    * @param {object} opts
    * @example
    * const hs = new HubspotClient(props);
    * hs.pages.createOrUpdateUrlMapping(opts).then(response => console.log(response));
    * @property {int} opts.id If set, this will update the page with the corresponding ID.
    * @property {int} opts.routePrefix,
    *  @property {int} opts.destination,
    *  @property {int} opts.redirectStyle,
    *  @property {int} opts.isMatchFullUrl,
    *  @property {int} opts.isMatchQueryString,
    *  @property {int} opts.isOnlyAfterNotFound,
    *  @property {int} opts.isPattern,
    *  @property {int} opts.precedence
    * @returns {Promise}
    */
    createOrUpdateUrlMapping,
    /**
    * Get URL Mappings for a portal
    * @async
    * @memberof hs/urlMappings
    * @method getUrlMappings
    * @param {object} opts
    * @example
    * const hs = new HubspotClient(props);
    * @property {int} opts.limit,
    * @property {int} opts.offset,
    * @property {int} opts.id,
    * @property {int} opts.routePrefix,
    * @property {int} opts.destination
    */ 
    getUrlMappings,
    /**
     * Get URL Mapping by ID
     * @async
     * @memberof hs/urlMappings
     * @method getUrlMapping
     * @param {int} UrlMappingId
     * @example
     * const hs = new HubspotClient(props);
     * hs.urlMappings.getUrlMapping(UrlMappingId).then(response => console.log(response));
     * @returns {Promise}
     */
    getUrlMappingById,
    /**
     * Retrieve page info by ID
     * @async
     * @memberof hs/urlMappings
     * @method deleteUrlMapping
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.pages.deleteUrlMapping(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deleteUrlMapping
    };
  }