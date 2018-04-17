require('dotenv').config();
const HubSpotAPI = require('../dist/hubspot-api');
const expect = require('chai').expect;
const debug = require('debug')('hubspot-api:tests'); //eslint-disable-line
const {
  schemaPosts,
  schemaPost,
  schemaAuthors,
  validate
} = require('./schemas/blog');

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_BLOG_ID: content_group_id
} = process.env;
const hs = new HubSpotAPI({ hapikey });

describe('Get Blog Post List', async () => {
  it('returns a valid blog post list response with no query', async () => {
    const posts = await hs.blog.getPosts();
    expect(validate(posts, schemaPosts).error).to.be.a('null');
    return Promise.resolve();
  });

  it('returns a valid blog post list response with a limit set', async () => {
    const limit = 5;
    const posts = await hs.blog.getPosts({ limit });
    expect(validate(posts, schemaPosts).error).to.be.a('null');
    const { objects } = posts;
    expect(objects)
      .to.be.an('array')
      .and.has.lengthOf(limit);
    return Promise.resolve();
  });

  it('returns a valid blog post list response with only archived posts', async () => {
    const posts = await hs.blog.getPosts({ archived: true });
    const { objects } = posts;
    expect(validate(posts, schemaPosts).error).to.be.a('null');
    const allArchivedPosts = objects.every(obj => obj.archived);
    expect(allArchivedPosts).to.equal(true);
    return Promise.resolve();
  });
});

describe('Creating Blog Posts', async () => {
  it('creates a blog post and returns a valid response', async () => {
    const createdPostResponse = await hs.blog.createOrUpdatePost({
      name: `A test post created by testing at ${new Date().getTime()}`,
      post_body:
        'This blog post was created by an E2E test as part of the hubspot-api library, you can safely delete it.',
      content_group_id
    });
    expect(validate(createdPostResponse, schemaPost).error).to.be.a('null');
    return Promise.resolve();
  });
});

describe('Get Blog Authors List', async () => {
  it('returns a valid blog author response', async () => {
    const authors = await hs.blog.getAuthors();
    expect(validate(authors, schemaAuthors).error).to.be.a('null');
  });
});
