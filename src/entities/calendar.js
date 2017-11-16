// NOTE: FULLY_IMPLEMENTED
// NOTE: REQUIRES_TESTS

import utilities, { createRequest } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const events = async ({
  startDate,
  endDate,
  limit,
  contentCategory,
  campaignGuid,
  includeNoCampaigns,
  type
}) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Both "startDate" and "endDate" in ms are required fields');
    }
    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      startDate,
      endDate,
      limit,
      contentCategory,
      campaignGuid,
      includeNoCampaigns
    });
    if (type) {
      Object.assign(mergedProps, { type });
    }
    const filteredEvents = await createRequest(constants.api.calendar.events, {}, mergedProps);
    return Promise.resolve(filteredEvents);
  } catch (e) {
    return Promise.reject(e.message);
  }
};
const getTask = async (taskId) => {
  try {
    const mergedProps = Object.assign({}, defaults, baseOptions);
    const task = await createRequest(constants.api.calendar.taskById, { taskId }, mergedProps);
    return Promise.resolve(task);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    const mergedProps = Object.assign({}, defaults, baseOptions);
    const method = 'DELETE';
    const task = await createRequest(constants.api.calendar.taskById, { method, taskId }, mergedProps);
    console.log(task);
    return Promise.resolve({ msg: `Task ${taskId} removed` });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const updateTask = async (taskId, {
  eventDate,
  eventType,
  category,
  state,
  campaignGuid,
  topicIds,
  name,
  description,
  ownerId
}) => {
  try {
    const mergedProps = Object.assign({}, defaults, baseOptions);
    const method = 'PUT';
    let body = {
      eventDate,
      eventType,
      category,
      state,
      campaignGuid,
      topicIds,
      name,
      description,
      ownerId
    };
    body = utilities.sanitizeObject(body);
    const updatedTask = await createRequest(constants.api.calendar.taskById, { body, method, taskId },
      mergedProps);
    return Promise.resolve(updatedTask);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const createTask = async ({
  eventDate,
  eventType,
  category,
  state,
  campaignGuid,
  contentGroupId,
  topicIds,
  templatePath,
  name,
  description,
  ownerId
}) => {
  try {
    const mergedProps = Object.assign({}, defaults, baseOptions);
    const method = 'POST';
    let body = {
      eventDate,
      eventType,
      category,
      state,
      campaignGuid,
      contentGroupId,
      topicIds,
      templatePath,
      name,
      description,
      ownerId
    };

    // Set defaults if not set.
    if (!state) {
      Object.assign(body, { state: 'TODO' });
    }
    if (!eventType) {
      Object.assign(body, { eventType: 'PUBLISHING_TASK' });
    }
    body = utilities.sanitizeObject(body);

    const filteredEvents = await createRequest(constants.api.calendar.createTask, { body, method }, mergedProps);
    return Promise.resolve(filteredEvents);
  } catch (e) {
    return Promise.reject(e.message);
  }
};


const contentEvents = ({ startDate, endDate, limit, contentCategory, campaignGuid, includeNoCampaigns }) => events({
  startDate,
  endDate,
  limit,
  contentCategory,
  campaignGuid,
  includeNoCampaigns,
  type: 'CONTENT'
});

const socialEvents = ({ startDate, endDate, limit, contentCategory, campaignGuid, includeNoCampaigns }) => events({
  startDate,
  endDate,
  limit,
  contentCategory,
  campaignGuid,
  includeNoCampaigns,
  type: 'SOCIAL'
});

const taskEvents = ({ startDate, endDate, limit, contentCategory, campaignGuid, includeNoCampaigns }) => events({
  startDate,
  endDate,
  limit,
  contentCategory,
  campaignGuid,
  includeNoCampaigns,
  type: 'PUBLISHING_TASK'
});

module.exports = function calendar(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
    * Retrieve all event types
    * @async
    * @memberof hs/calendar
    * @method events
    * @param {object} eventProperties An object containing event properties to search for
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.events(eventProperties)
    * @property {number} eventProperties.startDate
    * @property {number} eventProperties.endDate
    * @property {number} [eventProperties.limit]
    * @returns {Promise}
    */
    events,
    /**
    * Retrieve all events of type 'content'
    * @async
    * @memberof hs/calendar
    * @method contentEvents
    * @param {object} eventProperties An object containing event properties to search for
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.contentEvents(eventProperties)
    * @property {number} eventProperties.startDate
    * @property {number} eventProperties.endDate
    * @property {number} [eventProperties.limit]
    * @returns {Promise}
    */
    contentEvents,
    /**
    * Retrieve all events of type 'social'
    * @async
    * @memberof hs/calendar
    * @method socialEvents
    * @param {object} eventProperties An object containing event properties to search for
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.socialEvents(eventProperties)
    * @property {number} eventProperties.startDate
    * @property {number} eventProperties.endDate
    * @property {number} [eventProperties.limit]
    * @returns {Promise}
    */
    socialEvents,
    /**
    * Retrieve all events of type 'task'
    * @async
    * @memberof hs/calendar
    * @method taskEvents
    * @param {object} eventProperties An object containing event properties to search for
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.taskEvents(eventProperties)
    * @property {number} eventProperties.startDate
    * @property {number} eventProperties.endDate
    * @property {number} [eventProperties.limit]
    * @returns {Promise}
    */
    taskEvents,
    /**
    * Create new task
    * @async
    * @memberof hs/calendar
    * @method createTask
    * @param {object} taskProperties An object containing task properties to create
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.createTask(taskProperties)
    * @property {number} taskProperties.eventDate
    * @property {number} [taskProperties.eventType=PUBLISHING_TASK]
    * @property {number} taskProperties.category
    * @property {number} [taskProperties.state=TODO]
    * @property {number} [taskProperties.campaignGuid]
    * @property {number} [taskProperties.contentGroupId] - Required if category=BLOG_POST
    * @property {number} [taskProperties.topicIds]
    * @property {number} [taskProperties.templatePath]
    * @property {number} [taskProperties.name]
    * @property {number} [taskProperties.description]
    * @property {number} [taskProperties.ownerId]
    * @returns {Promise}
    */
    createTask,
    /**
    * Get Task By ID
    * @async
    * @memberof hs/calendar
    * @method getTask
    * @param {number} taskId ID of task to retrieve
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.getTask(taskId)
    * @returns {Promise}
    */
    getTask,
    /**
    * Update existing task
    * @async
    * @memberof hs/calendar
    * @method updateTask
    * @param {number} taskId ID of task to update
    * @param {object} taskProperties An object containing task properties to update
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.updateTask(taskProperties)
    * @property {number} [taskProperties.eventDate]
    * @property {number} [taskProperties.eventType]
    * @property {number} [taskProperties.category]
    * @property {number} [taskProperties.state]
    * @property {number} [taskProperties.campaignGuid]
    * @property {number} [taskProperties.topicIds]
    * @property {number} [taskProperties.name]
    * @property {number} [taskProperties.description]
    * @property {number} [taskProperties.ownerId]
    * @returns {Promise}
    */
    updateTask,
    /**
    * Delete Task By ID
    * @async
    * @memberof hs/calendar
    * @method deleteTask
    * @param {number} taskId ID of task to delete
    * @example
    * const hs = new HubspotClient(props);
    * const events = hs.calendar.deleteTask(taskId)
    * @returns {Promise}
    */
    deleteTask
  };
};
