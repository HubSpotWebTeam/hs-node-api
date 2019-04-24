import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {
  limit: 5
};
let _baseOptions;

const getCampaignsWithRecentActivity = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const { offset, limit } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      offset,
      limit
    });
    const recentCampaigns = await createRequest(
      constants.api.emailEvents.campaignsWithRecentActivity,
      {},
      mergedProps
    );
    return Promise.resolve(recentCampaigns);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getCampaign = async (campaignId, appId) => {
  try {
    requiresAuthentication(_baseOptions);
    const mergedProps = Object.assign({}, defaults, _baseOptions, { appId });
    const campaignInfo = await createRequest(
      constants.api.emailEvents.campaign,
      {
        campaignId
      },
      mergedProps
    );
    return Promise.resolve(campaignInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function emailEvents(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * For a given portal, return all campaign IDs sorted by recent activity associated with the portal.
     * @async
     * @memberof hs/emailEvents
     * @method getCampaignsWithRecentActivity
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.emailEvents.getCampaignsWithRecentActivity(opts).then(response => console.log(response));
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @returns {Promise}
     */
    getCampaignsWithRecentActivity,
    /**
     * For a given campaign, return data associated with the campaign.
     * @async
     * @memberof hs/emailEvents
     * @method getCampaign
     * @param {int} campaignId Selected campaign id.
     * @param {int} appId The Application Id for the given email. Found in the get_campaigns endpoint.
     * @example
     * const hs = new HubspotClient(props);
     * hs.emailEvents.getCampaign(campaignId, appId).then(response => console.log(response));
     * @returns {Promise}
     */
    getCampaign
  };
}
