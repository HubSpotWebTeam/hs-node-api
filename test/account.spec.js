require('dotenv').config();
const HubSpotClient = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaAccount, validate } = require('./schemas/account');

const { E2E_TESTS_HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotClient({ hapikey });

describe('Get details for HubSpot account', async () => {
  it('returns a valid HubSpot Account details response', async () => {
    const account = await hs.account.getAccountDetails();
    expect(validate(account, schemaAccount).error).to.be.a('null');
  });
});
