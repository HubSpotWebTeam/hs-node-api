import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;


const getAllDeals = async (opts = {}) => {
  try {
    const { limit, offset, properties, propertiesWithHistory, associations } = opts;

    let additionalOpts = {
      limit,
      offset
    };

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );

    const allDeals = await createRequest(
      constants.api.deals.getAll,
      {},
      mergedProps
    );

    return Promise.resolve(allDeals);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

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
    getRecentlyCreated, getAllDeals
  };
}
