require('dotenv').config();
const { expect } = require('chai');
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const HubSpotClient = require('../src/index').default;
const { schemaFiles, validate } = require('./schemas/file');

const { E2E_TESTS_FOLDER_ID: folderId, E2E_TESTS_HAPI_KEY: hapikey } = process.env;

const hs = new HubSpotClient({ hapikey });

describe('Entity:files Get files in Folder', async () => {
  it('gets file given folderId', async () => {
    const response = await hs.files.getFilesInFolder(folderId);
    const valid = validate(response, schemaFiles);
    expect(valid.error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Entity:files Get folders in parent folder with 4 subdirectories', async () => {
  it('gets sub folders', async () => {
    const { total_count } = await hs.files.getFolders(folderId);
    expect(total_count).to.equal(4);
  });
});
