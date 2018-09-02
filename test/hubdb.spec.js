require('dotenv').config();
const HubSpotClient = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const {
  schemaTable,
  schemaTables,
  schemaRow,
  schemaRows,
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
    expect(validate(createTableResponse, schemaTable).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Get table by ID', async () => {
  it('returns a valid table response', async () => {
    const getTableResponse = await hs.hubdb.getTableById(tableId, portalId);
    expect(validate(getTableResponse, schemaTable).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Get table rows', async () => {
  it('returns a valid table rows response', async () => {
    const getRowsResponse = await hs.hubdb.getTableRows(tableId, portalId);
    expect(validate(getRowsResponse, schemaRows).error).to.be.a('null');
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
