import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getRecentlyCreated = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, opts);
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
    getRecentlyCreated
  };
}
