require('dotenv').config();
const HubSpotClient = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaEvent, schemaEvents, validate } = require('./schemas/calendar');
const { tomorrow } = require('./utilities');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_BLOG_ID: contentGroupId
} = process.env;
const hs = new HubSpotClient({ hapikey });

describe('Get Calendar Event List', async () => {
  it('returns a valid calendar event list response with no query', async () => {
    const events = await hs.calendar.taskEvents({
      startDate: new Date().getTime(),
      endDate: tomorrow()
    });
    expect(validate(events, schemaEvents).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Creating Calendar Event', async () => {
  it('creates an event and returns a valid response', async () => {
    const createdEventResponse = await hs.calendar.createTask({
      eventDate: tomorrow(),
      category: 'BLOG_POST',
      state: 'TODO',
      name: 'Test Blog Task With topics 3',
      description: 'Cool Post with Topics',
      contentGroupId
    });
    expect(validate(createdEventResponse, schemaEvent).error).to.be.a('null');
    return Promise.resolve();
  });
});
