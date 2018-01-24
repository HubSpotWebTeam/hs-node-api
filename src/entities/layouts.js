import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getLayouts = async (opts = {}) => {
  try {
    const { limit, offset, id, domain, is_resolving, created, primary_site_page } = opts;
    const additionalOpts = {
      domain,
      limit,
      offset,
      is_resolving,
      primary_site_page,
      id
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({
      created
    }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const domains = await createRequest(constants.api.domains.getAll, {}, mergedProps);
    return Promise.resolve(domains);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getLayout = async (id) => {
  try {
    if (!id) {
      throw new Error('getLayout requires an `id` argument');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const domainInfo = await createRequest(constants.api.domains.byId, { id }, mergedProps);
    return Promise.resolve(domainInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


export default function domainsApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    getLayouts,
    getLayout
  };
}
