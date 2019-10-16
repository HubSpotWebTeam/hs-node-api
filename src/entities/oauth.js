import createRequest from '../utilities';
import constants from '../constants';

const getTokenInfo = async token => {
  try {
    const info = await createRequest(
      constants.api.oauth.tokenInfo,
      { token }
    );
    return Promise.resolve(info);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function oauthApi() {
  return {
    /**
     * Get the meta data for an access token. This can be used to get the email address of the HubSpot * user that the token was created for.
     * @memberof hs/oauth
     * @method getTokenInfo
     * @param {string} token  The access token that you want to get the information for.
     * @example
     * const hs = new HubspotClient(props);
     * hs.oauth.getTokenInfo(token).then(response => console.log(response));
     * @returns {Promise}
     */
    getTokenInfo
  };
}
