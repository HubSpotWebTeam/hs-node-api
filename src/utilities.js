import qs from 'querystring';
import axios from 'axios';

const debugApp = require('debug')('hubspot-api:utilities');

export const requiresAuthentication = ({ hapikey, accessToken }) => {
  if (!hapikey && !accessToken) {
    throw new Error('This method requires hapikey/accessToken authentication');
  }
};

const interpolate = (template, data, opts = {}) => {
  // For escaping strings to go in regex
  const regexEscape = /([$^\\/()|?+*[\]{}.-])/g;
  const delimiter = opts.delimiter || '{}';
  const delLen = delimiter.length;
  const lDelLen = Math.ceil(delLen / 2);
  // escape delimiters for regex
  const lDel = delimiter.substr(0, lDelLen).replace(regexEscape, '\\$1');
  const rDel =
    delimiter.substr(lDelLen, delLen).replace(regexEscape, '\\$1') || lDel;

  // construct the new regex
  const regex = new RegExp(`${lDel}[^${lDel}${rDel}]+${rDel}`, 'g');

  return template.replace(regex, placeholder => {
    const key = placeholder.slice(lDelLen, -lDelLen);
    const keyParts = key.split('.');
    let val;
    let i = 0;
    const len = keyParts.length;

    if (key in data) {
      // need to be backwards compatible with "flattened" data.
      val = data[key];
    } else {
      // look up the chain
      val = data;
      for (; i < len; i++) {
        if (keyParts[i] in val) {
          val = val[keyParts[i]];
        } else {
          return placeholder;
        }
      }
    }
    return val;
  });
};

export default async function createRequest(uri, options, props = {}) {
  try {
    const properties = Object.keys(props).reduce((acc, curr) => {
      if (typeof props[curr] !== 'undefined') {
        acc[curr] = props[curr];
      }
      return acc;
    }, {});
    // Prevent this from being appended to URL.
    delete properties.accessToken;

    const url = `${interpolate(uri, options)}?${qs.stringify(properties)}`;
    debugApp(`url: ${url}`);
    const method = options.method || 'GET';
    debugApp(`${method}: ${url}`);
    const headers = {};
    const timeout = 30000;
    const data = options.body || {};
    if (props.accessToken) {
      headers.Authorization = `Bearer ${props.accessToken}`;
    }
    return axios({ url, method, headers, timeout, data }).then(response => response.data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const queryStringParamInterpolator = (objs, original) => {
  const response = Object.keys(objs)
    .map(key => {
      if (key && objs[key]) {
        // Remove from the original object
        delete original[key];
        const innerResp = Object.keys(objs[key]).reduce((acc, curr) => {
          acc[`${key}__${curr}`] = objs[key][curr];
          return acc;
        }, {});
        return innerResp;
      }
      return undefined;
    })
    .reduce((acc, curr) => {
      Object.assign(acc, curr);
      return acc;
    }, {});

  return Object.assign(original, response);
};

export const sanitizeObject = obj => JSON.parse(JSON.stringify(obj));
