import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getPublishingChannels = async () => {
  try {
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

  return { getPublishingChannels, createBroadcastMessage };
}
