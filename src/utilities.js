import interpolate from 'interpolate';
import qs from 'querystring';
import request from 'request-promise';

export default async function createRequest(uri, options, props) {
  try {
    const properties = Object.keys(props).reduce((acc, curr) => {
      if (props[curr]) {
        acc[curr] = props[curr];
      }
      return acc;
    }, {});
    // Prevent this from being appended to URL.
    delete properties.accessToken;

    const url = `${interpolate(uri, options)}?${qs.stringify(properties)}`;
    const method = options.method || 'GET';
    console.log(`${method} ${url}`);
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
}

export const sanitizeObject = obj => JSON.parse(JSON.stringify(obj));
