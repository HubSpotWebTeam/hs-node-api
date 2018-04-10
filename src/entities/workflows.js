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
    getWorkflow,
    createWorkflow,
    updateWorkflow
  };
}
