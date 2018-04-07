const nock = require('nock');
const qs = require('querystring');
const blogSearchResponse = require('./json/blog-search.json');
const blogAuthorsResponse = require('./json/blog-authors.json');
const contactsResponse = require('./json/contacts.json');

const getContactsResponse = (uri, requestBody, cb) => {
  const response = Object.assign({}, contactsResponse);
  // Extrapolate out the querystring properties into a usable object.
  const queryObject = qs.parse(uri.substr(uri.indexOf('?') + 1, uri.length));

  // Modify based on query string props
  if (queryObject.count) {
    let { objects } = response;
    objects = objects.slice(0, queryObject.limit);
    Object.assign(response, { objects });
  }

  cb(null, [200, response]);
};

const getBlogSearchResponse = (uri, requestBody, cb) => {
  const response = Object.assign({}, blogSearchResponse);
  // Extrapolate out the querystring properties into a usable object.
  const queryObject = qs.parse(uri.substr(uri.indexOf('?') + 1, uri.length));

  // Modify based on query string props
  if (queryObject.limit) {
    let { objects } = response;
    objects = objects.slice(0, queryObject.limit);
    Object.assign(response, { objects });
  }

  if (queryObject.archived) {
    let { objects } = response;
    objects = objects.filter(obj => obj.archived);
    Object.assign(response, { objects });
  }

  cb(null, [200, response]);
};

const getBlogAuthorsResponse = (uri, requestBody, cb) => {
  const response = Object.assign({}, blogAuthorsResponse);
  cb(null, [200, response]);
};

module.exports = function () {
  // Successful blog response
  nock('https://api.hubapi.com')
    .persist()
    .get('/content/api/v2/blog-posts')
    .query(true)
    .reply(getBlogSearchResponse);

  // Successful blog authors response
  nock('https://api.hubapi.com')
    .persist()
    .get('/blogs/v3/blog-authors')
    .query(true)
    .reply(getBlogAuthorsResponse);

  // Successful blog authors response
  nock('https://api.hubapi.com')
    .persist()
    .get('/contacts/v1/lists/all/contacts/all')
    .query(true)
    .reply(getContactsResponse);
};
