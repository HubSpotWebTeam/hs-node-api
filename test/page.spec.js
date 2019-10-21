require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const { schemaPages, schemaPage, validate } = require('./schemas/page');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_PAGE_ID: id,
  E2E_TESTS_TEMPLATE_PATH: template_path
} = process.env;

const hs = new HubSpotClient({ hapikey });

// FIXME: Improve these tests.
xdescribe('Get Pages List', async () => {
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

describe('Create or Update Page', async () => {
  it('creates a new page or updates page and gets a valid response', async () => {
    const createPageResponse = await hs.pages.createOrUpdatePage({
      name: 'A test page',
      subcategory: 'site_page'
    });
    expect(validate(createPageResponse, schemaPage).error).to.be.a('null');
    return Promise.resolve();
  });
});

// FIXME: This test is failing
xdescribe('Update Page Template', async () => {
  it('updates page template and gets a valid response', async () => {
    const createPageResponse = await hs.pages.createOrUpdatePage({
      id,
      template_path,
      template_path_for_render: template_path
    });
    expect(validate(createPageResponse, schemaPage).error).to.be.a('null');
    return Promise.resolve();
  });
});
