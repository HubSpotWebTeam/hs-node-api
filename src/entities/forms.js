import omit from 'lodash.omit';
import createRequest from '../utilities';
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

  return {
    /**
     * Submit a form with data See the {@link https://developers.hubspot.com/docs/methods/forms/submit_form|developer docs} for full spec.
     * @async
     * @memberof hs/forms
     * @method submitForm
     * @param {int} portalId Portal ID the form resides on
     * @param {string} formId ID of form to submit.
     * @param {object} formFields Key/value pairs of form fields.
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.forms.submitForm(portalId, formId, formFields);
     * @returns {Promise}
     */
    submitForm
  };
}
