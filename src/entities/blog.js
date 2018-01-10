import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getAll = async (opts = {}) => {
  try {
    const { name, limit, offset, created, deleted_at } = opts;
    const additionalOpts = {
      limit,
      offset
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({ name, created, deleted_at }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const blogPosts = await createRequest(constants.api.blog.getAll, {}, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createOrUpdateAuthor = async ({
  id,
  email,
  fullName,
  userId,
  username,
  bio,
  website,
  twitter,
  linkedin,
  facebook,
  googlePlus,
  avatar
}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    let method = 'POST';
    const body = {
      email,
      fullName,
      userId,
      username,
      bio,
      website,
      twitter,
      linkedin,
      facebook,
      googlePlus,
      avatar
    };
    let url = constants.api.blog.authors;
    const options = { method, body };

    if (id) {
      method = 'PUT';
      url = constants.api.blog.authorById;
      Object.assign(options, { method, id });
    }

    const author = await createRequest(url, options, mergedProps);
    return Promise.resolve(author);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getAuthors = async (opts = {}) => {
  try {
    const { email, limit, offset, id, fullName, slug, created, updated } = opts;
    const additionalOpts = {
      email,
      limit,
      offset
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({
      id,
      fullName,
      slug,
      created,
      updated
    }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const authors = await createRequest(constants.api.blog.authors, {}, mergedProps);
    return Promise.resolve(authors);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getAuthor = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const author = await createRequest(constants.api.blog.authorById, { id }, mergedProps);
    return Promise.resolve(author);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteAuthor = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.blog.authorById, { id, method: 'DELETE' },
      mergedProps);
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const searchAuthors = async ({ order, limit, offset, q, active, blog }) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, { order, limit, offset, q, active, blog });
    const authors = await createRequest(constants.api.blog.searchAuthors, {}, mergedProps);
    return Promise.resolve(authors);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const getById = async (blog_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const blogInfo = await createRequest(constants.api.blog.byId, { blog_id }, mergedProps);
    return Promise.resolve(blogInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getVersion = async (blog_id, revision_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    let url = constants.api.blog.getVersions;
    const options = { blog_id };
    if (revision_id) {
      url = constants.api.blog.getVersion;
      Object.assign(options, { revision_id });
    }
    const blogInfo = await createRequest(url, options, mergedProps);
    return Promise.resolve(blogInfo);
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
    createOrUpdateAuthor,
    deleteAuthor,
    getAuthor,
    getAuthors,
    getById,
    getAll,
    getVersion,
    getPosts,
    searchAuthors
  };
}
