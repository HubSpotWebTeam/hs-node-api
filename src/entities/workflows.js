import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createWorkflow = async (opts = {}) => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions, opts);
    const body = Object.assign({}, opts);
    const method = 'POST';

    const workflowInfo = await createRequest(
      constants.api.workflows.create,
      { method, body },
      mergedProps
    );
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
    const workflowInfo = await createRequest(
      constants.api.workflows.get,
      { id },
      mergedProps
    );
    return Promise.resolve(workflowInfo);
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
      throw new Error(
        'Workflow payload requires an `id` and `portalId` property'
      );
    }

    const workflowInfo = await createRequest(
      constants.api.workflows.get,
      { method, body, id },
      mergedProps
    );
    return Promise.resolve(workflowInfo);
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
     * const response = hs.workflows.getWorkflow(workflowId);
     * @returns {Promise}
     */
    getWorkflow,
    /**
     * Create a new workflow
     * @async
     * @memberof hs/workflows
     * @method createWorkflow
     * @param {object} workflowBody See https://developers.hubspot.com/docs/methods/workflows/v3/create_workflow for examples of workflow JSON
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.workflows.createWorkflow(workflowBody);
     * @returns {Promise}
     */
    createWorkflow,
    /**
     * Update an existing workflow
     * @async
     * @memberof hs/workflows
     * @method updateWorkflow
     * @param {object} workflowBody See https://developers.hubspot.com/docs/methods/workflows/v3/create_workflow for examples of workflow JSON
     * @example
     * const hs = new HubspotClient(props);
     * const response = hs.workflows.updateWorkflow(workflowBody);
     * @property {int} opts.id The ID of the workflow you want to update.
     * @property {int} opts.portalId The ID of the portal that the workflow resides on
     * @returns {Promise}
     */
    updateWorkflow
  };
}
