require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line

const { E2E_TESTS_FORM_ID: formId, E2E_TESTS_PORTAL_ID: portalId, E2E_TESTS_HAPI_KEY: hapikey } = process.env;

const hs = new HubSpotClient({ hapikey });

describe('Get Form', async () => {
  it('gets form given formId', async () => {
    const form = await hs.forms.getForm(formId);
    expect(form).to.exist;
  });
})

describe('Form Submit', async () => {
  it('successfully submits a form', async () => {
    const body = {
      fields: [
        {
          name: 'email',
          value: 'example@example.com'
        },
        {
          name: 'firstname',
          value: 'Jeff'
        }
      ],
      context: {
        pageUri: 'www.example.com/page',
        pageName: 'Example page'
      },
      legalConsentOptions: {
        consent: { // Include this object when GDPR options are enabled
          consentToProcess: true,
          text: 'I agree to allow Example Company to store and process my personal data.',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text: 'I agree to receive marketing communications from Example Company.'
            }
          ]
        }
      }
    };

    const result = await hs.forms.submitFormV3(portalId, formId, { ...body });
    expect(result.errors).to.be.an('undefined');
  });
});
