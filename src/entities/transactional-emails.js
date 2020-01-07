
import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

let _baseOptions;

const singleSend = async (emailId, message, contactProperties, customProperties) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'POST';
    const response = await createRequest(
      constants.api.transactionalEmail.singleSend,
      {
        method,
        body: {
          emailId,
          message,
          contactProperties,
          customProperties
        }
      }
    );
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default function transactionalEmails(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Send an email designed and maintained in the HubSpot marketing Email Tool.
     * See the {@link https://developers.hubspot.com/docs/methods/email/transactional_email/single-send-overview|developer docs} for full spec.
     * @async
     * @memberof hs/transactionalEmails
     * @method singleSend
     * @param {int} emailId The ID of the email to send, from the Email Tool when viewing a transactional email.
     * @param {string} message A JSON object holding the recipient (in its to field) as well as other customizations that can be made on the fly.
     * @param {object} contactProperties A list of JSON objects representing contact property values to set when sending the email.
     * @param {object} customProperties A list of JSON objects representing property values to set when sending the email.
     * @example
     * const hs = new HubspotClient(props);
     * hs.transactionalEmails.singleSend(emailId, message, contactProperties, customProperties).then(response => console.log(response));
     * @returns {Promise}
     */
    singleSend
  };
}
