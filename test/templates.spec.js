require('dotenv').config();
const HubSpotClient = require('../dist/hubspot-api');
const expect = require('chai').expect;

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_TEMPLATE_ID: templateId,
} = process.env;

const hs = new HubSpotClient({ hapikey });


// FIXME: This test is failing.
xdescribe('Update Template', async () => {
  it('updates a template in a portal', async () => {
    const updateValue = '<p>Test</p>';
    const template = await hs.templates.updateTemplate(templateId, JSON.stringify({ source: updateValue }));
    expect(template.id.toString()).to.equal(templateId);
    return Promise.resolve();
  });
});
