import createRequest, {
  queryStringParamInterpolator,
  requiresAuthentication
} from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

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

const getUrlMapping = async id => {
  try {
    requiresAuthentication(_baseOptions);
    if (!id) {
      throw new Error('getUrlMapping requires an `id` argument');
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


export default function urlMappingApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
    * Get URL Mappings for a portal
    * @async
    * @memberof hs/domains
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
     * @memberof hs/domains
     * @method getUrlMapping
     * @param {int} UrlMappingId
     * @example
     * const hs = new HubspotClient(props);
     * hs.domains.getUrlMapping(UrlMappingId).then(response => console.log(response));
     * @returns {Promise}
     */
    getUrlMapping,
    };
  }