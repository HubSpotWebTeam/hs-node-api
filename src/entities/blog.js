import createRequest, { queryStringParamInterpolator } from '../utilities';
import constants from '../constants';

const allowablePublishActions = ['schedule-publish', 'cancel-publish'];
const defaults = {};
let _baseOptions;

const getAllBlogs = async (opts = {}) => {
  try {
    const { name, limit, offset, created, deleted_at } = opts;
    let additionalOpts = {
      limit,
      offset
    };
    // Extract additional dynamic querystring params and values.
    additionalOpts = queryStringParamInterpolator(
      { name, created, deleted_at },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const blogPosts = await createRequest(
      constants.api.blog.getAll,
      {},
      mergedProps
    );
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
    let additionalOpts = {
      email,
      limit,
      offset
    };
    // Extract additional dynamic querystring params and values.

    additionalOpts = queryStringParamInterpolator(
      {
        id,
        fullName,
        slug,
        created,
        updated
      },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const authors = await createRequest(
      constants.api.blog.authors,
      {},
      mergedProps
    );
    return Promise.resolve(authors);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getAuthor = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const author = await createRequest(
      constants.api.blog.authorById,
      { id },
      mergedProps
    );
    return Promise.resolve(author);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteAuthor = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.blog.authorById,
      { id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const searchAuthors = async (opts = {}) => {
  try {
    const { order, limit, offset, q, active, blog } = opts; //eslint-disable-line
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      order,
      limit,
      offset,
      q,
      active,
      blog
    });
    const authors = await createRequest(
      constants.api.blog.authorSearch,
      {},
      mergedProps
    );
    return Promise.resolve(authors);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getComments = async (opts = {}) => {
  try {
    const { limit, offset, portalId, state, contentId, reverse, query } = opts;
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      limit,
      offset,
      portalId,
      state,
      contentId,
      reverse,
      query
    });
    const comments = await createRequest(
      constants.api.blog.comments,
      {},
      mergedProps
    );
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
    const comments = await createRequest(
      constants.api.blog.comments,
      { method, body },
      mergedProps
    );
    return Promise.resolve(comments);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTopics = async (opts = {}) => {
  try {
    const { id, name, created, slug, limit, offset } = opts;

    let additionalOpts = {
      limit,
      offset,
      slug
    };
    // Extract additional dynamic querystring params and values.

    additionalOpts = queryStringParamInterpolator(
      { id, name, created },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const topics = await createRequest(
      constants.api.blog.topics,
      {},
      mergedProps
    );
    return Promise.resolve(topics);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTopic = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const topic = await createRequest(
      constants.api.blog.topic,
      { id },
      mergedProps
    );
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

    let additionalOpts = {
      limit,
      offset,
      slug,
      q,
      active,
      blog
    };
    // Extract additional dynamic querystring params and values.

    additionalOpts = queryStringParamInterpolator(
      { id, name, created },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const topics = await createRequest(
      constants.api.blog.topicSearch,
      {},
      mergedProps
    );
    return Promise.resolve(topics);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createOrUpdateTopic = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const { id, name, description } = opts;

    const body = {
      name,
      description
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

const getComment = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const comment = await createRequest(
      constants.api.blog.commentById,
      { id },
      mergedProps
    );
    return Promise.resolve(comment);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteComment = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.blog.commentById,
      { id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoreDeletedComment = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.blog.restoreDeletedComment,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve({ restored: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getBlogById = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const blogInfo = await createRequest(
      constants.api.blog.byId,
      { id },
      mergedProps
    );
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

    let additionalOpts = {
      limit,
      offset,
      archived,
      blog_author_id,
      campaign,
      content_group_id,
      state,
      order_by
    };

    // Extract additional dynamic querystring params and values.

    additionalOpts = queryStringParamInterpolator(
      {
        created,
        deleted_at,
        name,
        updated,
        slug
      },
      additionalOpts
    );

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const blogPosts = await createRequest(
      constants.api.blog.posts,
      {},
      mergedProps
    );
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostById = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const blogPosts = await createRequest(
      constants.api.blog.postById,
      { id },
      mergedProps
    );
    return Promise.resolve(blogPosts);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deletePost = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.blog.postById,
      { id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const clonePost = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const { id, name } = opts;
    const body = { name };
    const method = 'POST';
    await createRequest(
      constants.api.blog.clonePostById,
      { id, body, method },
      mergedProps
    );
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
    await createRequest(
      constants.api.blog.publishOrSchedulePost,
      { id, body, method },
      mergedProps
    );
    return Promise.resolve({ scheduleChanged: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteTopic = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.blog.topic,
      { id, method: 'DELETE' },
      mergedProps
    );
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostAutosaveBuffer = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const buffer = await createRequest(
      constants.api.blog.postAutoSaveBuffer,
      { id },
      mergedProps
    );
    return Promise.resolve(buffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostAutosaveBufferStatus = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(
      constants.api.blog.postAutoSaveBufferStatus,
      { id },
      mergedProps
    );
    return Promise.resolve(bufferStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostVersions = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const versions = await createRequest(
      constants.api.blog.postVersions,
      { id },
      mergedProps
    );
    return Promise.resolve(versions);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getPostVersionById = async (id, version_id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const version = await createRequest(
      constants.api.blog.postVersions,
      { id, version_id },
      mergedProps
    );
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
    const version = await createRequest(
      constants.api.blog.postVersions,
      { id, body, method },
      mergedProps
    );
    return Promise.resolve(version);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const validatePostAutosaveBufferStatus = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(
      constants.api.blog.validatePostAutoSaveBuffer,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve(bufferStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoredDeletedPost = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const postStatus = await createRequest(
      constants.api.blog.restorePostById,
      { id, method: 'POST' },
      mergedProps
    );
    return Promise.resolve(postStatus);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const pushPostAutosaveBufferLive = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const bufferStatus = await createRequest(
      constants.api.blog.pushPostAutosaveBufferToLive,
      { id, method: 'POST' },
      mergedProps
    );
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
    const buffer = await createRequest(
      constants.api.blog.postAutoSaveBuffer,
      { id, method, body },
      mergedProps
    );
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
    const { groupedTopicName, topicIds } = opts;

    const body = {
      groupedTopicName,
      topicIds
    };

    const method = 'POST';
    const update = await createRequest(
      constants.api.blog.groupTopics,
      { method, body },
      mergedProps
    );
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function blog(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Merge multiple topics by ID into a single topic group.
     * @async
     * @memberof hs/blog
     * @method groupTopics
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.groupTopics(opts).then(response => console.log(response))
     * @property {string} opts.groupedTopicName
     * @property {array<int>} opts.topicIds
     * @returns {Promise}
     */
    groupTopics,
    /**
     * Create a new comment.
     * @async
     * @memberof hs/blog
     * @method createComment
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.createComment(opts).then(response => console.log(response))
     * @property {string} opts.comment
     * @property {int} opts.contentId
     * @property {int} opts.collectionId
     * @property {string} opts.contentAuthorEmail
     * @property {string} opts.contentAuthorName
     * @property {string} opts.contentPermalink
     * @property {string} opts.contentTitle
     * @property {string} opts.userEmail
     * @property {string} opts.userName
     * @property {string} opts.userUrl
     * @returns {Promise}
     */
    createComment,
    /**
     * Create or update a blog post.
     * @async
     * @memberof hs/blog
     * @method createOrUpdatePost
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.createOrUpdatePost(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {int} opts.blog_author_id
     * @property {string} opts.campaign
     * @property {string} opts.campaign_name
     * @property {int} opts.content_group_id
     * @property {string} opts.featured_image
     * @property {string} opts.footer_html
     * @property {string} opts.head_html
     * @property {string} opts.keywords
     * @property {string} opts.meta_description
     * @property {string} opts.name
     * @property {string} opts.post_body
     * @property {string} opts.post_summary
     * @property {int} opts.publish_date
     * @property {boolean} opts.publish_immediately
     * @property {string} opts.slug
     * @property {array} opts.topic_ids
     * @property {boolean} opts.use_featured_image
     * @property {string} opts.widgets
     * @returns {Promise}
     */
    createOrUpdatePost,
    /**
     * Restore a deleted comment
     * @async
     * @memberof hs/blog
     * @method restoreDeletedComment
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.restoreDeletedComment(opts).then(response => console.log(response))
     * @returns {Promise}
     */
    restoreDeletedComment,
    /**
     * Create or update a blog author info.
     * @async
     * @memberof hs/blog
     * @method createOrUpdateAuthor
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.createOrUpdateAuthor(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {string} opts.email
     * @property {string} opts.fullName
     * @property {string} opts.userId
     * @property {string} opts.username
     * @property {string} opts.bio
     * @property {string} opts.website
     * @property {string} opts.twitter
     * @property {string} opts.linkedin
     * @property {string} opts.facebook
     * @property {string} opts.googlePlus
     * @property {string} opts.avatar
     * @returns {Promise}
     */
    createOrUpdateAuthor,
    /**
     * Create or update a blog topic.
     * @async
     * @memberof hs/blog
     * @method createOrUpdateTopic
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.createOrUpdateTopic(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {string} opts.name
     * @property {string} opts.description
     * @returns {Promise}
     */
    createOrUpdateTopic,
    /**
     * Clones a blog post
     * @async
     * @memberof hs/blog
     * @method clonePost
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.clonePost(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {string} opts.name
     * @returns {Promise}
     */
    clonePost,
    /**
     * Remove a blog author
     * @async
     * @memberof hs/blog
     * @method deleteAuthor
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.deleteAuthor(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deleteAuthor,
    /**
     * Remove a blog comment
     * @async
     * @memberof hs/blog
     * @method deleteComment
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.deleteComment(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deleteComment,
    /**
     * Remove a blog post
     * @async
     * @memberof hs/blog
     * @method deletePost
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.deletePost(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deletePost,
    /**
     * Remove a blog topic
     * @async
     * @memberof hs/blog
     * @method deleteTopic
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.deleteTopic(id).then(response => console.log(response))
     * @returns {Promise}
     */
    deleteTopic,
    /**
     * Retrieve blog author details
     * @async
     * @memberof hs/blog
     * @method getAuthor
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getAuthor(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getAuthor,
    /**
     * Retrieve all blog authors
     * @async
     * @memberof hs/blog
     * @method getAuthors
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getAuthors(id).then(response => console.log(response))
     * @property {string} opts.email
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {int} opts.id
     * @property {string} opts.fullName
     * @property {string} opts.slug
     * @property {int} opts.created
     * @property {int} opts.updated
     * @returns {Promise}
     */
    getAuthors,
    /**
     * Retrieve blog info for specific blog
     * @async
     * @memberof hs/blog
     * @method getBlogById
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getBlogById(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getBlogById,
    /**
     * Retrieve blog topic info
     * @async
     * @memberof hs/blog
     * @method getTopic
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getTopic(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getTopic,
    /**
     * Retrieve blog topic info
     * @async
     * @memberof hs/blog
     * @method getTopics
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getTopics(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {string} opts.name
     * @property {int} opts.created
     * @property {string} opts.slug
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @returns {Promise}
     */
    getTopics,
    /**
     * Retrieve blog post info by ID
     * @async
     * @memberof hs/blog
     * @method getPostById
     * @param {int} id
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPostById(id).then(response => console.log(response))
     * @returns {Promise}
     */
    getPostById,
    /**
     * Retrieve blog post versions by post ID
     * @async
     * @memberof hs/blog
     * @method getPostVersions
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPostVersions(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    getPostVersions,
    /**
     * Retrieve blog post version
     * @async
     * @memberof hs/blog
     * @method getPostVersionById
     * @param {int} versionId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPostVersionById(versionId).then(response => console.log(response))
     * @returns {Promise}
     */
    getPostVersionById,
    /**
     * Retrieve blog post autosave buffer contents
     * @async
     * @memberof hs/blog
     * @method getPostAutosaveBuffer
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPostAutosaveBuffer(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    getPostAutosaveBuffer,
    /**
     * Retrieve blog post autosave buffer status
     * @async
     * @memberof hs/blog
     * @method getPostAutosaveBufferStatus
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPostAutosaveBufferStatus(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    getPostAutosaveBufferStatus,
    /**
     * Update the autosave buffer for a post
     * @async
     * @memberof hs/blog
     * @method updateAutosaveBuffer
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.updateAutosaveBuffer(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {int} opts.blog_author_id
     * @property {string} opts.campaign
     * @property {string} opts.campaign_name
     * @property {int} opts.content_group_id
     * @property {string} opts.featured_image
     * @property {string} opts.footer_html
     * @property {string} opts.head_html
     * @property {string} opts.keywords
     * @property {string} opts.meta_description
     * @property {string} opts.name
     * @property {string} opts.post_body
     * @property {string} opts.post_summary
     * @property {int} opts.publish_date
     * @property {boolean} opts.publish_immediately
     * @property {string} opts.slug
     * @property {array} opts.topic_ids
     * @property {boolean} opts.use_featured_image
     * @property {string} opts.widgets
     * @returns {Promise}
     */
    updateAutosaveBuffer,
    /**
     * Push the autosave buffer for a post to live.
     * @async
     * @memberof hs/blog
     * @method pushPostAutosaveBufferLive
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.pushPostAutosaveBufferLive(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    pushPostAutosaveBufferLive,
    /**
     * Get info for all blogs on a particular portal
     * @async
     * @memberof hs/blog
     * @method getAllBlogs
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getAllBlogs(opts).then(response => console.log(response))
     * @property {string} opts.name
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {int} opts.created
     * @property {int} opts.deleted_at
     * @returns {Promise}
     */
    getAllBlogs,
    /**
     * Get all blog posts for specified blog
     * @async
     * @memberof hs/blog
     * @method getPosts
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getPosts(opts).then(response => console.log(response))
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {boolean} opts.archived
     * @property {int} opts.blog_author_id
     * @property {string} opts.campaign
     * @property {int} opts.content_group_id
     * @property {string} opts.slug
     * @property {string} opts.state
     * @property {string} opts.order_by
     * @property {int} opts.created
     * @property {int} opts.deleted_at
     * @property {string} opts.name
     * @property {boolean} opts.updated
     * @returns {Promise}
     */
    getPosts,
    /**
     * Get all comments for specific content
     * @async
     * @memberof hs/blog
     * @method getComments
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getComments(opts).then(response => console.log(response))
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {int} opts.portalId
     * @property {string} opts.state
     * @property {int} opts.contentId
     * @property {boolean} opts.reverse
     * @property {string} opts.query
     * @returns {Promise}
     */
    getComments,
    /**
     * Get specific comment
     * @async
     * @memberof hs/blog
     * @method getComment
     * @param {int} commentId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.getComment(commentId).then(response => console.log(response))
     * @returns {Promise}
     */
    getComment,
    /**
     * Publish, unpublish, or schedule a post
     * @async
     * @memberof hs/blog
     * @method publishOrSchedulePost
     * @param {int} postId
     * @param {string} publishAction One of `schedule-publish` or `cancel-publish`
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.publishOrSchedulePost(postId, publishAction).then(response => console.log(response))
     * @returns {Promise}
     */
    publishOrSchedulePost,
    /**
     * Restore a previously deleted post
     * @async
     * @memberof hs/blog
     * @method restoredDeletedPost
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.restoredDeletedPost(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    restoredDeletedPost,
    /**
     * Restore a post version to a specific ID.
     * @async
     * @memberof hs/blog
     * @method restorePostVersionById
     * @param {int} postId
     * @param {int} versionId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.restorePostVersionById(postId, versionId).then(response => console.log(response))
     * @returns {Promise}
     */
    restorePostVersionById,
    /**
     * Search blog authors
     * @async
     * @memberof hs/blog
     * @method searchAuthors
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.searchAuthors(opts).then(response => console.log(response))
     * @property {int} opts.order
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {string} opts.q Free text search parameter
     * @property {boolean} opts.active
     * @property {int} opts.blog
     * @returns {Promise}
     */
    searchAuthors,
    /**
     * Search blog topics
     * @async
     * @memberof hs/blog
     * @method searchTopics
     * @param {object} opts
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.searchTopics(opts).then(response => console.log(response))
     * @property {int} opts.id
     * @property {string} opts.name
     * @property {int} opts.created
     * @property {string} opts.slug
     * @property {int} opts.limit
     * @property {int} opts.offset
     * @property {string} opts.q Free text search parameter
     * @property {boolean} opts.active
     * @property {int} opts.blog
     * @returns {Promise}
     */
    searchTopics,
    /**
     * Validate the autosave buffer on a post.
     * @async
     * @memberof hs/blog
     * @method validatePostAutosaveBufferStatus
     * @param {int} postId
     * @example
     * const hs = new HubspotClient(props);
     * hs.blog.validatePostAutosaveBufferStatus(postId).then(response => console.log(response))
     * @returns {Promise}
     */
    validatePostAutosaveBufferStatus
  };
}
