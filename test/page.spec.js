require('dotenv').config();
const HubSpotAPI = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaPages, schemaPage, validate } = require('./schemas/page');

const { E2E_TESTS_HAPI_KEY: hapikey } = process.env;

const hs = new HubSpotAPI({ hapikey });

describe('Get Pages List', async () => {
  it('returns a valid page list', async () => {
    const pages = await hs.pages.getPages();
    expect(validate(pages, schemaPages).error).to.be.a('null');
    return Promise.resolve();
  });

  it('returns a valid page list with filters applied', async () => {
    const pages = await hs.pages.getPages({
      limit: 2,
      name: { icontains: 'About' }
    });
    expect(validate(pages, schemaPages).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Create Page', async () => {
  it('creates a new page and gets a valid response', async () => {
    const createPageResponse = await hs.pages.createOrUpdatePage({
      name: 'A test page',
      subcategory: 'site_page'
    });
    expect(validate(createPageResponse, schemaPage).error).to.be.a('null');
    return Promise.resolve();
  });
});
