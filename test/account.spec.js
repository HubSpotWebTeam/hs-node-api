require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaDailyLimit, validate } = require('./schemas/account');

const { E2E_TESTS_HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotClient({ hapikey });

describe('Get Daily Limit', async () => {
  it('returns a valid daily limit response', async () => {
    const dailyLimit = await hs.account.getDailyLimit();
    expect(validate(dailyLimit[0], schemaDailyLimit).error).to.be.a('null');
  });
});
