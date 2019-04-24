import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getPublishingChannels = async () => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const publishingChannels = await createRequest(
      constants.api.social.channels,
      {},
      mergedProps
    );
    return Promise.resolve(publishingChannels);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createBroadcastMessage = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const { channelGuid, status, triggerAt, body, photoUrl } = opts;

    const method = 'POST';
    const requestBody = {
      channelGuid,
      triggerAt,
      content: {
        body,
        photoUrl
      },
      status
    };

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.social.createBroadcastMessage,
      {
        method,
        body: requestBody
      },
      mergedProps
    );
    return Promise.resolve({ status, scheduled: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function socialApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get publishing channels for selected portal
     * @async
     * @memberof hs/social
     * @method getPublishingChannels
     * @example
     * const hs = new HubspotClient(props);
     * hs.social.getPublishingChannels().then(response => console.log(response));
     * @returns {Promise}
     */
    getPublishingChannels,
    /**
     * Create a broadcast message
     * @async
     * @memberof hs/social
     * @method createBroadcastMessage
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.social.createBroadcastMessage(opts).then(response => console.log(response));
     * @property {string} opts.channelGuid
     * @property {string} opts.status
     * @property {int} opts.triggerAt
     * @property {string} opts.body
     * @property {string} opts.photoUrl
     * @returns {Promise}
     */
    createBroadcastMessage
  };
}
