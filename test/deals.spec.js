require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const {
  schemaDeal,
  schemaDeals,
  schemaRecentDeals,
  validate
} = require('./schemas/deal');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
} = process.env;

const newDealData = {
  properties: [
    {
      value: 'Corp Deal',
      name: 'dealname'
    },
    {
      value: 'appointmentscheduled',
      name: 'dealstage'
    }
  ]
};

const hs = new HubSpotClient({ hapikey });

describe('Get all deals', async () => {
  it('returns a valid  deals response with no options', async () => {
    const deals = await hs.deals.getAll();
    expect(validate(deals, schemaDeals).error).to.be.a('null');
    return Promise.resolve();
  });

  it('returns a valid deal response with a limit set', async () => {
    const limit = 3;
    const response = await hs.deals.getAll({ limit });
    expect(validate(response, schemaDeals).error).to.be.a('null');
    expect(response.deals).to.be.an('array').and.has.lengthOf(limit);
    return Promise.resolve();
  });
});

xdescribe('Get recently created deals', async () => {
  // FIXME: Failing because the endpoint is not always accessible.
  it('returns a valid  deals response with some deals', async () => {
    const deals = await hs.deals.getRecentlyCreated();
    expect(validate(deals, schemaRecentDeals).error).to.be.a('null');
    return Promise.resolve();
  });

  // FIXME: Failing because the test portal doesnt have 3 recently created deals at any/all times.
  it('returns a valid deal response with total equal to count', async () => {
    const count = 3;
    const response = await hs.deals.getRecentlyCreated({ count });
    expect(validate(response, schemaRecentDeals).error).to.be.a('null');
    expect(response.results).to.be.an('array').and.has.lengthOf(count);
    return Promise.resolve();
  });
});

describe('Create a new deal', async () => {
  it('creates a deal and returns a valid response', async () => {
    const deals = await hs.deals.createOrUpdate(newDealData);
    expect(validate(deals, schemaDeal).error).to.be.a('null');
    return Promise.resolve();
  });
});
