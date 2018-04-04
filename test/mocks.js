const nock = require('nock');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const blogSearchResponse = require('./json/blog-search.json');

// let blogSearchResponse =
//   fs.readFileSync(path.resolve(__dirname, './json/blog-search.json'), 'utf-8');
// blogSearchResponse = JSON.parse(blogSearchResponse);

const getBlogSearchResponse = (uri, requestBody, cb) => {
  const response = Object.assign({}, blogSearchResponse);
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

  // console.log(response);
  cb(null, [200, response]);
};

module.exports = function () {
  // Successful blog response
  nock('https://api.hubapi.com')
    .persist()
    .get('/content/api/v2/blog-posts')
    .query(true)
    .reply(getBlogSearchResponse);
};
