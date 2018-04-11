import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getDomains = async (opts = {}) => {
  try {
    const {
      limit,
      offset,
      id,
      domain,
      is_resolving,
      created,
      primary_site_page
    } = opts;
    const additionalOpts = {
      domain,
      limit,
      offset,
      is_resolving,
      primary_site_page,
      id
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(
      additionalOpts,
      queryStringParamInterpolator({
        created
      })
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const domains = await createRequest(
      constants.api.domains.getAll,
      {},
      mergedProps
    );
    return Promise.resolve(domains);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getDomain = async id => {
  try {
    if (!id) {
      throw new Error('getDomain requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const domainInfo = await createRequest(
      constants.api.domains.byId,
      { id },
      mergedProps
    );
    return Promise.resolve(domainInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function domainsApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get all domains for a portal
     * @async
     * @memberof hs/domains
     * @method getDomains
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.domains.getDomains(opts).then(response => console.log(response));
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {int} opts.id
     * @property {string} opts.domain
     * @property {boolean} opts.is_resolving
     * @property {int} opts.created
     * @property {string} opts.primary_site_page
     * @returns {Promise}
     */
    getDomains,
    /**
     * Get domain by ID
     * @async
     * @memberof hs/domains
     * @method getDomain
     * @param {int} domainId
     * @example
     * const hs = new HubspotClient(props);
     * hs.domains.getDomain(domainId).then(response => console.log(response));
     * @returns {Promise}
     */
    getDomain
  };
}
