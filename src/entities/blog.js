import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';


const defaults = {};
let _baseOptions;

const getBlogs = async (opts = {}) => {
  try {
    const { name, limit, offset, created, deleted_at } = opts;
    const additionalOpts = {
      limit,
      offset
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({ name, created, deleted_at }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const blogPosts = await createRequest(constants.api.blog.getBlogs, {}, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const getPosts = async (opts = {}) => {
  try {
    const { name } = opts;
    const additionalOpts = {
      name__icontains: name
    };

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const blogPosts = await createRequest(constants.api.blog.getPosts, {}, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function blog(baseOptions) {
  _baseOptions = baseOptions;

  return {
    getBlogs,
    getPosts
  };
}
