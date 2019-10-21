require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaContactsProperties, validate } = require('./schemas/contactsProperties');

const { E2E_TESTS_HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotClient({ hapikey });

describe('Get Contacts Properties List', async () => {
  it('returns a valid contacts properties response', async () => {
    const contactsProperties = await hs.contactsProperties.getAllContactsProperties();
    expect(validate(contactsProperties, schemaContactsProperties).error).to.be.a('null');
  });
});
