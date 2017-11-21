import utilities, { createRequest } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getPosts = async (opts = {}) => {
  try {
    const { name } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      name__icontains: name
    });

    console.log(mergedProps);

    const blogPosts = await createRequest(constants.api.blog.getPosts, {}, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = function blog(baseOptions) {
  _baseOptions = baseOptions;

  return {
    getPosts
  };
};
