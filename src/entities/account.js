import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;


const getAccountDetails = async (opts = {}) => {
  try {
    const { accessToken } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions);

    const accountInfo = await createRequest(
      constants.api.account.getAccountDetails,
      { accessToken },
      mergedProps
    );

    return Promise.resolve(accountInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


export default function accountApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get details for a HubSpot account
     * @async
     * @memberof hs/account
     * @method getAccountDetails
     * @example
     * const hs = new HubSpotClient(props);
     * hs.account.getAccountDetails(opts).then(response => console.log(response));
     * @returns {Promise}
     */
    getAccountDetails
  };
}
