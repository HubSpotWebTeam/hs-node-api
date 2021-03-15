require('dotenv').config();
const HubSpotClient = require('../src/index').default;
const expect = require('chai').expect;

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_LAYOUT_ID: layoutId,
  E2E_TESTS_LAYOUT_VERSION_ID: versionId,
} = process.env;

const hs = new HubSpotClient({ hapikey });

describe('List Layouts', async () => {
  it('gets all layouts for an account', async () => {
    const layouts = await hs.layouts.getLayouts();
    expect(layouts.limit).to.equal(100);
    return Promise.resolve();
  });
});

describe('Get layout by id', () => {
  it('get the details for a specific layout, by ID.', async () => {
    const layout = await hs.layouts.getLayoutBuffer(layoutId);
    expect(layout).to.be.an('object');
    expect(layout.id.toString()).to.equal(layoutId);
    return Promise.resolve();
  });
});

describe('Get Layout Buffer', async () => {
  it('gets the current contents of the auto save buffer', async () => {
    const layout = await hs.layouts.getLayoutBuffer(layoutId);
    expect(layout).to.be.an('object');
    expect(layout.id.toString()).to.equal(layoutId);
    return Promise.resolve();
  });
});

describe('Determine if the auto-save buffer differs from he live layout', () => {
  it('returns an object with the key `has_changes`', async () => {
    const hasBufferedChanges = await hs.layouts.hasBufferedChanges(layoutId);
    expect(hasBufferedChanges).to.be.an('object');
    expect(hasBufferedChanges.has_changes).to.be.a('boolean');
    return Promise.resolve();
  });
});

describe('Get previous versions of the layout', () => {
  it('returns a array of previous versions', async () => {
    const previousVersions = await hs.layouts.getPreviousLayoutVersions(layoutId);
    expect(previousVersions).to.be.an('array');
    return Promise.resolve();
  });
});

describe('Get Previous Version of the layout', () => {
  it('returns the previous version specified in the id', async () => {
    const previousVersion = await hs.layouts.getPreviousLayoutVersion({ id: layoutId, versionId });
    expect(previousVersion).to.be.an('array').with.lengthOf(3);
    return Promise.resolve();
  });
});

