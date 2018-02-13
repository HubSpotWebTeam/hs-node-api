import createRequest from '../utilities';
import constants from '../constants';

const defaults = {
  limit: 5
};
let _baseOptions;

const getCampaignsWithRecentActivity = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, opts);
    const recentCampaigns = await createRequest(constants.api.emailEvents.campaignsWithRecentActivity, {}, mergedProps);
    return Promise.resolve(recentCampaigns);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getCampaign = async (appId, campaignId) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, { appId });
    const campaignInfo = await createRequest(constants.api.emailEvents.campaign, {
      campaignId
    }, mergedProps);
    return Promise.resolve(campaignInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

// const get

export default function workflows(baseOptions) {
  _baseOptions = baseOptions;

  return { getCampaignsWithRecentActivity, getCampaign };
}
