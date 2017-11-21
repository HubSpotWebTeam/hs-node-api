const interpolate = require('interpolate');
const qs = require('querystring');
const request = require('request-promise');
const debug = require('debug')('utilities');

const createRequest = async (uri, options, props) => {
  try {
    const url = `${interpolate(uri, options)}?${qs.stringify(props)}`;
    const method = options.method || 'GET';
    debug(`${method} ${url}`);
    const headers = {};
    const timeout = 30000;
    const json = options.body || true;
    if (props.accessToken) {
      Object.assign(headers, { Authorization: `Bearer ${props.accessToken}` });
    }
    const response = await request({ url, method, headers, timeout, json });
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const sanitizeObject = obj => JSON.parse(JSON.stringify(obj));

module.exports = { createRequest, sanitizeObject };
