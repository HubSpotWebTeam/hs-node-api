const HubSpotAPI = require('../dist/hs-api');
const expect = require('chai').expect;
const debug = require('debug')('hs-api:tests');
// Setup the nock mocks.
require('./mocks')();

const hs = new HubSpotAPI({ hapikey: 'testuser' });

describe('Blog Post List', async () => {
  it('returns a valid blog post list response with no query', async () => {
    const responses = await hs.blog.getPosts();
    const { limit, offset, objects } = responses;
    expect(limit).to.be.a('number');
    expect(offset).to.be.a('number');
    expect(objects)
      .to.be.an('array')
      .and.has.lengthOf.above(1);
    return Promise.resolve();
  });

  it('returns a valid blog post list response with a limit set', async () => {
    const limit = 5;
    const responses = await hs.blog.getPosts({ limit });
    const { offset, objects } = responses;
    expect(offset).to.be.a('number');
    expect(objects)
      .to.be.an('array')
      .and.has.lengthOf(limit);
    return Promise.resolve();
  });

  it('returns a valid blog post list response with only archived posts', async () => {
    const responses = await hs.blog.getPosts({ archived: true });
    const { objects } = responses;
    // We've modified the mocked JSON to have exactly 2 archived posts
    expect(objects)
      .to.be.an('array')
      .and.has.lengthOf(2);
    return Promise.resolve();
  });

  return Promise.resolve();
});

describe('Blog authors', async () => {
  it('returns a valid blog author response', async () => {
    const responses = await hs.blog.getAuthors();
    const { limit, offset, objects } = responses;
    expect(limit).to.be.a('number');
    expect(offset).to.be.a('number');
    expect(objects)
      .to.be.an('array')
      .and.has.lengthOf.above(0);
    return Promise.resolve();
  });

  return Promise.resolve();
});

describe('Contacts', async () => {
  it('returns a valid contact response', async () => {
    const responses = await hs.contacts.getContacts();
    const { contacts, 'has-more': hasMore, 'vid-offset': offset } = responses;
    expect(hasMore).to.be.a('boolean');
    expect(offset).to.be.a('number');
    expect(contacts)
      .to.be.an('array')
      .and.has.lengthOf.above(0);
    return Promise.resolve();
  });

  return Promise.resolve();
});
