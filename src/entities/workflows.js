import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createWorkflow = async (opts = {}) => {
  try {
    const {
      type,
      name,
      actions,
      description,
      enabled,
      portalId,
      isSegmentBased,
      listening,
      nurtureTimeRange,
      onlyExecOnBizDays,
      insertedAt,
      updatedAt,
      recurringSetting,
      enrollOnCriteriaUpdate,
      onlyEnrollsManually,
      creationSource,
      updateSource,
      allowContactToTriggerMultipleTimes,
      unenrollmentSetting,
      segmentCriteria,
      goalCriteria,
      reEnrollmentTriggerSets,
      triggerSets,
      suppressionListIds,
      lastUpdatedBy,
      metaData
    } = opts;
    const body = {
      type,
      name,
      actions,
      description,
      enabled,
      portalId,
      isSegmentBased,
      listening,
      nurtureTimeRange,
      onlyExecOnBizDays,
      insertedAt,
      updatedAt,
      recurringSetting,
      enrollOnCriteriaUpdate,
      onlyEnrollsManually,
      creationSource,
      updateSource,
      allowContactToTriggerMultipleTimes,
      unenrollmentSetting,
      segmentCriteria,
      goalCriteria,
      reEnrollmentTriggerSets,
      triggerSets,
      suppressionListIds,
      lastUpdatedBy,
      metaData
    };

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const method = 'POST';

    const workflowInfo = await createRequest(constants.api.workflows.create, {
      method,
      body
    }, mergedProps);
    return Promise.resolve(workflowInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getWorkflow = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    if (!id) {
      throw new Error('getWorkflow requires an `id` argument');
    }
    const workflowInfo = await createRequest(constants.api.workflows.byId, {
      id
    }, mergedProps);
    return Promise.resolve(workflowInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteWorkflow = async id => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    if (!id) {
      throw new Error('deleteWorkflow requires an `id` argument');
    }
    await createRequest(constants.api.workflows.byId, {
      method: 'DELETE',
      id
    }, mergedProps);
    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const updateWorkflow = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const body = Object.assign({}, opts);
    const method = 'PUT';
    const { id, portalId } = opts;
    if (!id || !portalId) {
      throw new Error('Workflow payload requires an `id` and `portalId` property');
    }

    const workflowInfo = await createRequest(constants.api.workflows.byId, {
      method,
      body,
      id
    }, mergedProps);
    return Promise.resolve(workflowInfo);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getAll = async () => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const allWorkflows = await createRequest(constants.api.workflows.getAll, {}, mergedProps);
    return Promise.resolve(allWorkflows);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const enrollContact = async (opts = {}) => {
  try {
    const { workflowId, email } = opts;
    const method = 'POST';
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.workflows.enrollContact, {
      method,
      workflowId,
      email
    }, mergedProps);
    return Promise.resolve({ enrolled: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const unenrollContact = async (opts = {}) => {
  try {
    const { workflowId, email } = opts;
    const method = 'DELETE';
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.workflows.enrollContact, {
      method,
      workflowId,
      email
    }, mergedProps);
    return Promise.resolve({ unenrolled: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getEnrollments = async (id) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const enrollments = await createRequest(constants.api.workflows.enrollments, {
      id
    }, mergedProps);
    return Promise.resolve(enrollments);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getWorkflowEventLog = async (opts = {}) => {
  try {
    const { vid, types, workflowId } = opts;
    const body = {
      vid,
      types
    };
    const method = 'PUT';
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const eventLogs = await createRequest(constants.api.workflows.eventLogs, {
      method,
      body,
      workflowId
    }, mergedProps);
    return Promise.resolve(eventLogs);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function workflows(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Get workflow by ID
     * @async
     * @memberof hs/workflows
     * @method getWorkflow
     * @param {int} workflowId
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.getWorkflow(workflowId).then(response => console.log(response));
     * @returns {Promise}
     */
    getWorkflow,
    /**
     * Create a new workflow
     * @async
     * @memberof hs/workflows
     * @method createWorkflow
     * @param {object} workflowBody See {@link https://developers.hubspot.com/docs/methods/workflows/v3/create_workflow|developer docs} for examples of workflow JSON
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.createWorkflow(workflowBody).then(response => console.log(response));
     * @returns {Promise}
     */
    createWorkflow,
    /**
     * Update an existing workflow
     * @async
     * @memberof hs/workflows
     * @method updateWorkflow
     * @param {object} workflowBody See {@link https://developers.hubspot.com/docs/methods/workflows/v3/create_workflow|developer docs} for examples of workflow JSON
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.updateWorkflow(workflowBody).then(response => console.log(response));
     * @property {int} opts.id The ID of the workflow you want to update.
     * @property {int} opts.portalId The ID of the portal that the workflow resides on
     * @returns {Promise}
     */
    updateWorkflow,
    /**
     * Delete an existing workflow
     * @async
     * @memberof hs/workflows
     * @method deleteWorkflow
     * @param {int} id The ID of the workflow you wish to delete
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.deleteWorkflow(workflowBody).then(response => console.log(response));
     * @returns {Promise}
     */
    deleteWorkflow,
    /**
     * Get all workflows
     * @async
     * @memberof hs/workflows
     * @method getAll
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.getAll().then(response => console.log(response));
     * @returns {Promise}
     */
    getAll,
    /**
     * Enroll a contact in a workflow
     * @async
     * @memberof hs/workflows
     * @method enrollContact
     * @param {object} opts Contact & workflow options
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.enrollContact(opts).then(response => console.log(response));
     * @property {int} opts.workflowId The ID of the workflow you want to enroll the contact to.
     * @property {int} opts.email The email address of the contact you wish to enroll.
     * @returns {Promise}
     */
    enrollContact,
    /**
     * Unenroll a contact from a workflow
     * @async
     * @memberof hs/workflows
     * @method unenrollContact
     * @param {object} opts Contact & workflow options
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.unenrollContact(opts).then(response => console.log(response));
     * @property {int} opts.workflowId The ID of the workflow you want to unenroll the contact from.
     * @property {int} opts.email The email address of the contact you wish to unenroll.
     * @returns {Promise}
     */
    unenrollContact,
    /**
     * Get workflow enrollments for the specified contact ID
     * @async
     * @memberof hs/workflows
     * @method getEnrollments
     * @param {int} id Contact id to retrieve enrollments for
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.getEnrollments(id).then(response => console.log(response));
     * @returns {Promise}
     */
    getEnrollments,
    /**
     * Get a list of log events for a contact by workflow. For more information, checkout the {@link https://developers.hubspot.com/docs/methods/workflows/log_events|developer docs}.
     * @async
     * @memberof hs/workflows
     * @method getWorkflowEventLog
     * @param {object} opts Filtering options
     * @example
     * const hs = new HubspotClient(props);
     * hs.workflows.getWorkflowEventLog({
        vid: 1283719823
        workflowId: 123239681612,
        types: ['ENROLLED']
      }).then(response => console.log(response));
     * @property {int} opts.vid The contact ID to filter on
     * @property {int} opts.workflowId The ID of the workflow you want to get log events for
     * @property {int} opts.types An array of event types
     * @returns {Promise}
     */
    getWorkflowEventLog
  };
}
