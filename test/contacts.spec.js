const HubSpotAPI = require('../dist/hs-api');
const expect = require('chai').expect;
const debug = require('debug')('hs-api:tests');
// Setup the nock mocks.
require('./mocks')();

const hs = new HubSpotAPI({ hapikey: 'testuser' });

describe('Contacts', async () => {
  it('returns a valid contact response', async () => {
    const responses = await hs.contacts.getContacts();
    const { contacts, 'has-more': hasMore, 'vid-offset': offset } = responses;
    expect(hasMore).to.be.a('boolean');
    expect(offset).to.be.a('number');
    expect(contacts)
      .to.be.an('array')
      .and.has.lengthOf.above(0);
  });
});
