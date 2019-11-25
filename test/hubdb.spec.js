require('dotenv').config();
const HubSpotClient = require('../dist/bundle.min');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const {
  schemaTables,
  schemaRow,
  validate
} = require('./schemas/hubdb');

const {
  E2E_TESTS_HUBDB_TABLE_ID: tableId,
  E2E_TESTS_HUBDB_PORTAL_ID: portalId,
  E2E_TESTS_HAPI_KEY: hapikey
} = process.env;

const hs = new HubSpotClient({ hapikey });

describe('Get Tables List', async () => {
  it('returns a valid list of tables', async () => {
    const tables = await hs.hubdb.getTables();
    expect(validate(tables, schemaTables).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Create Table', async () => {
  it('creates a new table and gets a valid response', async () => {
    const createTableResponse = await hs.hubdb.createTable({
      name: 'A test table'
    });
    expect(createTableResponse.id).to.be.a('number');
    expect(createTableResponse.name).to.be.a('string');
    return Promise.resolve();
  });
});

// FIXME: Figure out why test is failing
describe('Get table by ID', async () => {
  it('returns a valid table response', async () => {
    const getTableResponse = await hs.hubdb.getTableById(tableId, portalId);
    expect(getTableResponse.id).to.be.a('number');
    expect(getTableResponse.name).to.be.a('string');
    return Promise.resolve();
  });
});

// FIXME: Figure out why test is failing
describe('Get table rows', async () => {
  it('returns a valid table rows response', async () => {
    const getRowsResponse = await hs.hubdb.getTableRows(tableId, portalId);
    // eslint-disable-next-line no-unused-expressions
    expect(getRowsResponse.rows.objects).to.be.an('array').that.is.not.empty;
    return Promise.resolve();
  });
});

describe('Add a table row', async () => {
  it('returns a valid table row response', async () => {
    const ms = new Date().getTime();
    const addRowResponse = await hs.hubdb.addTableRow(tableId, {
      name: `Test row ${ms}`,
      path: `my-test-row-${ms}`
    });
    expect(validate(addRowResponse, schemaRow).error).to.be.a('null');
    return Promise.resolve();
  });
});
