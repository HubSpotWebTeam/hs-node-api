require('dotenv').config();
const { expect } = require('chai');
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const HubSpotClient = require('../dist/bundle.min');
const {
  schemaSubscription,
  schemaSubscriptions,
  validate
} = require('./schemas/webhooks');

const { E2E_TESTS_HAPI_DEVELOPER_KEY: hapikey, E2E_TESTS_APP_ID: appId } = process.env;

const hs = new HubSpotClient({ hapikey });

let id;
describe('Entity:subscriptions', async () => {
  it('gets all', async () => {
    const response = await hs.webhooks.getSubscriptions(appId);
    const valid = validate(response, schemaSubscriptions);
    expect(valid.error).to.be.a('null');

    return Promise.resolve();
  });

  it('Create subscription', async () => {
    const response = await hs.webhooks.createSubscription(appId, {
      subscriptionDetails: {
        subscriptionType: 'company.propertyChange',
        propertyName: 'newpropertynew'
      },
      enabled: false
    });
    id = response.id;

    const valid = validate(response, schemaSubscription);
    expect(valid.error).to.be.a('null');
    return Promise.resolve();
  });

  it('delete subscription', async () => {
    const response = await hs.webhooks.deleteSubscription(appId, id);

    // const valid = validate(response, schemaSubscription);
    // expect(valid.error).to.be.a('null');
    return Promise.resolve();
  });
});
