require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const {
  schemaEngagement,
  validate
} = require('./schemas/engagement');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_CONTACT_ID: contactId
} = process.env;

const newEngagementData = {
  engagement: {
    type: 'NOTE',
    active: true,
    timestamp: new Date().getTime()
  },
  associations: {
    contactIds: [contactId]
  },
  metadata: {
    body: 'A note about robot'
  }
};

const hs = new HubSpotClient({ hapikey });

describe('Create a new engagement', async () => {
  it('creates an engagement and returns a valid response', async () => {
    const engagement = await hs.engagements.create(newEngagementData);
    expect(validate(engagement, schemaEngagement).error).to.be.a('null');
    return Promise.resolve();
  });
});
