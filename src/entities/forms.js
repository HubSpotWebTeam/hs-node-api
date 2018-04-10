import omit from 'lodash.omit';
import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const submitForm = async (portalId, formId, opts = {}) => {
  try {
    // hs-context params
    const { hutk, ipAddress, pageUrl, pageName, redirectUrl } = opts;

    const method = 'POST';
    const hs_context = JSON.stringify({
      hutk,
      ipAddress,
      pageUrl,
      pageName,
      redirectUrl
    });

    const mergedProps = Object.assign(
      {
        hs_context
      },
      defaults,
      _baseOptions,
      // Property values. This is essentially the entire payload minus the formId, portalId and hs_context params.
      omit(opts, ['hutk', 'ipAddress', 'pageUrl', 'pageName', 'redirectUrl'])
    );

    await createRequest(
      constants.api.forms.submitForm,
      {
        formId,
        portalId,
        method
      },
      mergedProps
    );

    return Promise.resolve({ submitted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function domainsApi(baseOptions) {
  _baseOptions = baseOptions;

  return { submitForm };
}
