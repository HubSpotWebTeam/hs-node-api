import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getRecentlyCreated = async (opts = {}) => {
  try {
    const { count, offset, since, includePropertyVersions } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      count,
      offset,
      since,
      includePropertyVersions
    });
    const recentlyCreatedDeals = await createRequest(
      constants.api.deals.recentlyCreated,
      {},
      mergedProps
    );
    return Promise.resolve(recentlyCreatedDeals);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function workflows(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get recently created deals
     * @async
     * @memberof hs/deals
     * @method getRecentlyCreated
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.deals.getRecentlyCreated(opts).then(response => console.log(response));
     * @property {int} opts.count
     * @property {int} opts.offset
     * @property {int} opts.since
     * @property {boolean} opts.includePropertyVersions
     * @returns {Promise}
     */
    getRecentlyCreated
  };
}
