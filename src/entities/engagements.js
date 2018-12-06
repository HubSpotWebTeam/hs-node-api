import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const create = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const { engagement, associations, metadata } = opts;

    const method = 'POST';
    const url = constants.api.engagements.create;
    const body = { engagement, associations, metadata };
    const options = { method, body };
    const result = await createRequest(
      url,
      options,
      mergedProps
    );
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function engagements(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create an engagement
     * @async
     * @memberof hs/engagements
     * @method create
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * const newEngagementOpts = {
     * engagement: {
     *   type: 'NOTE',
     *   active: true,
     *   timestamp: new Date().getTime()
     * },
     * associations: {
     *   companyIds: [53333385]
     * },
     * metadata: {
     *   body: 'A note about robot'
     * }
     *};
     * hs.engagements.create(newEngagementOpts).then(response => console.log(response));
     * @property {object} opts.engagement
     * @property {object} opts.associations
     * @property {object} opts.metadata
     * @property {array} opts.attachments
     * @returns {Promise}
     */
    create
  };
}
