import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const allowablePublishActions = ['schedule-publish', 'cancel-publish'];
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

const createOrUpdateAuthor = async (opts = {}) => {
  try {
    const {
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
    } = opts;
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

const searchAuthors = async (opts = {}) => {
  try {
    const { order, limit, offset, q, active, blog } = opts; //eslint-disable-line
    const mergedProps = Object.assign({}, defaults, _baseOptions, { order, limit, offset, q, active, blog });
    const authors = await createRequest(constants.api.blog.authorSearch, {}, mergedProps);
    return Promise.resolve(authors);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getComments = async (opts = {}) => {
  try {
    const { limit, offset, portalId, state, contentId, reverse, query } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions, { limit, offset, portalId, state, contentId, reverse, query });
    const comments = await createRequest(constants.api.blog.comments, {}, mergedProps);
    return Promise.resolve(comments);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createComment = async (opts = {}) => {
  try {
    const {
      comment,
      contentId,
      collectionId,
      contentAuthorEmail,
      contentAuthorName,
      contentPermalink,
      contentTitle,
      userEmail,
      userName,
      userUrl
    } = opts;
    const method = 'POST';
    const body = {
      comment,
      contentId,
      collectionId,
      contentAuthorEmail,
      contentAuthorName,
      contentPermalink,
      contentTitle,
      userEmail,
      userName,
      userUrl
    };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const comments = await createRequest(constants.api.blog.comments, { method, body }, mergedProps);
    return Promise.resolve(comments);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTopics = async (opts = {}) => {
  try {
    const {
      id,
      name,
      created,
      slug,
      limit,
      offset
    } = opts;

    const additionalOpts = {
      limit,
      offset,
      slug
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({ id, name, created }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const topics = await createRequest(constants.api.blog.topics, {}, mergedProps);
    return Promise.resolve(topics);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const getTopic = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const topic = await createRequest(constants.api.blog.topic, { id }, mergedProps);
    return Promise.resolve(topic);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const searchTopics = async (opts = {}) => {
  try {
    const {
      id,
      name,
      created,
      slug,
      limit,
      offset,
      q,
      active,
      blog //eslint-disable-line
    } = opts;

    const additionalOpts = {
      limit,
      offset,
      slug,
      q,
      active,
      blog
    };
    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({ id, name, created }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const topics = await createRequest(constants.api.blog.topicSearch, {}, mergedProps);
    return Promise.resolve(topics);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createOrUpdateTopic = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const {
      id,
      name,
      description
    } = opts;

    const body = {
      name, description
    };

    let method = 'POST';
    let url = constants.api.blog.topics;
    const options = { method, body };
    if (id) {
      method = 'PUT';
      url = constants.api.blog.topic;
      Object.assign(options, { method, id });
    }

    const update = await createRequest(url, options, mergedProps);
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const getComment = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const comment = await createRequest(constants.api.blog.commentById, { id }, mergedProps);
    return Promise.resolve(comment);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteComment = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.blog.commentById, { id, method: 'DELETE' }, mergedProps);
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoreDeletedComment = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.blog.restoreDeletedComment, { id, method: 'POST' }, mergedProps);
    return Promise.resolve({ restored: true });
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
    const {
      limit,
      offset,
      archived,
      blog_author_id,
      campaign,
      content_group_id,
      slug,
      state,
      order_by,
      created,
      deleted_at,
      name,
      updated
    } = opts;

    const additionalOpts = {
      limit,
      offset,
      archived,
      blog_author_id,
      campaign,
      content_group_id,
      slug,
      state,
      order_by
    };

    // Extract additional dynamic querystring params and values.
    Object.assign(additionalOpts, queryStringParamInterpolator({
      created,
      deleted_at,
      name,
      updated
    }));

    const mergedProps = Object.assign({}, defaults, _baseOptions, additionalOpts);
    const blogPosts = await createRequest(constants.api.blog.posts, {}, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostById = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const blogPosts = await createRequest(constants.api.blog.postById, { id }, mergedProps);
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deletePost = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.blog.postById, { id, method: 'DELETE' }, mergedProps);
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const clonePost = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const {
      id,
      name
    } = opts;
    const body = { name };
    const method = 'POST';
    await createRequest(constants.api.blog.clonePostById, { id, body, method }, mergedProps);
    return Promise.resolve({ cloned: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const publishOrSchedulePost = async (id, action) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    if (!~allowablePublishActions.indexOf(action)) {
      throw new Error(`Unrecognized publish action: ${action}`);
    }

    const body = { action };
    const method = 'POST';
    await createRequest(constants.api.blog.publishOrSchedulePost, { id, body, method }, mergedProps);
    return Promise.resolve({ scheduleChanged: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteTopic = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.blog.topic, { id, method: 'DELETE' }, mergedProps);
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostAutosaveBuffer = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const buffer = await createRequest(constants.api.blog.postAutoSaveBuffer, { id }, mergedProps);
    return Promise.resolve(buffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostAutosaveBufferStatus = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(constants.api.blog.postAutoSaveBufferStatus, { id }, mergedProps);
    return Promise.resolve(bufferStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostVersions = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const versions = await createRequest(constants.api.blog.postVersions, { id }, mergedProps);
    return Promise.resolve(versions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostVersionById = async (id, version_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const version = await createRequest(constants.api.blog.postVersions, { id, version_id }, mergedProps);
    return Promise.resolve(version);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restorePostVersionById = async (id, version_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = { version_id };
    const method = 'POST';
    const version = await createRequest(constants.api.blog.postVersions, { id, body, method }, mergedProps);
    return Promise.resolve(version);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const validatePostAutosaveBufferStatus = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(constants.api.blog.validatePostAutoSaveBuffer, { id, method: 'POST' }, mergedProps);
    return Promise.resolve(bufferStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoredDeletedPost = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const postStatus = await createRequest(constants.api.blog.restorePostById, { id, method: 'POST' }, mergedProps);
    return Promise.resolve(postStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const pushPostAutosaveBufferLive = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(constants.api.blog.pushPostAutosaveBufferToLive, { id, method: 'POST' }, mergedProps);
    return Promise.resolve(bufferStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const updateAutosaveBuffer = async (opts = {}) => {
  try {
    const {
      id,
      blog_author_id,
      campaign,
      campaign_name,
      content_group_id,
      featured_image,
      footer_html,
      head_html,
      keywords,
      meta_description,
      name,
      post_body,
      post_summary,
      publish_date,
      publish_immediately,
      slug,
      topic_ids,
      use_featured_image,
      widgets
    } = opts;
    if (!id) {
      throw new Error('No post ID specified');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = {
      blog_author_id,
      campaign,
      campaign_name,
      content_group_id,
      featured_image,
      footer_html,
      head_html,
      keywords,
      meta_description,
      name,
      post_body,
      post_summary,
      publish_date,
      publish_immediately,
      slug,
      topic_ids,
      use_featured_image,
      widgets
    };
    const method = 'PUT';
    const buffer = await createRequest(constants.api.blog.postAutoSaveBuffer, { id, method, body }, mergedProps);
    return Promise.resolve(buffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createOrUpdatePost = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const {
      id,
      blog_author_id,
      campaign,
      campaign_name,
      content_group_id,
      featured_image,
      footer_html,
      head_html,
      keywords,
      meta_description,
      name,
      post_body,
      post_summary,
      publish_date,
      publish_immediately,
      slug,
      topic_ids,
      use_featured_image,
      widgets
    } = opts;

    const body = {
      blog_author_id,
      campaign,
      campaign_name,
      content_group_id,
      featured_image,
      footer_html,
      head_html,
      keywords,
      meta_description,
      name,
      post_body,
      post_summary,
      publish_date,
      publish_immediately,
      slug,
      topic_ids,
      use_featured_image,
      widgets
    };

    let method = 'POST';
    let url = constants.api.blog.posts;
    const options = { method, body };
    if (id) {
      method = 'PUT';
      url = constants.api.blog.postById;
      Object.assign(options, { method, id });
    }

    const update = await createRequest(url, options, mergedProps);
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const groupTopics = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const {
      groupedTopicName,
      topicIds
    } = opts;

    const body = {
      groupedTopicName,
      topicIds
    };

    const method = 'POST';
    const update = await createRequest(constants.api.blog.groupTopics, { method, body }, mergedProps);
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


export default function blog(baseOptions) {
  _baseOptions = baseOptions;

  return {
    groupTopics,
    createComment,
    createOrUpdatePost,
    restoreDeletedComment,
    createOrUpdateAuthor,
    createOrUpdateTopic,
    clonePost,
    deleteAuthor,
    deleteComment,
    deletePost,
    deleteTopic,
    getAuthor,
    getAuthors,
    getById,
    getTopic,
    getTopics,
    getPostById,
    getPostVersions,
    getPostVersionById,
    getPostAutosaveBuffer,
    getPostAutosaveBufferStatus,
    updateAutosaveBuffer,
    pushPostAutosaveBufferLive,
    getAll,
    getVersion,
    getPosts,
    getComments,
    getComment,
    publishOrSchedulePost,
    restoredDeletedPost,
    restorePostVersionById,
    searchAuthors,
    searchTopics,
    validatePostAutosaveBufferStatus
  };
}
