import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const updateTemplate = async (templateId, body) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'PUT';
    const options = { method, body, templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const update = await createRequest(
      constants.api.templates.byId,
      options,
      mergedProps
    );
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createTemplate = async body => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'POST';
    const options = { method, body };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const update = await createRequest(
      constants.api.templates.base,
      options,
      mergedProps
    );
    return Promise.resolve(update);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const deleteTemplate = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'DELETE';
    const options = { method, templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.templates.byId, options, mergedProps);

    return Promise.resolve({ deleted: true });
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTemplate = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'GET';
    const options = { method, templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const template = await createRequest(
      constants.api.templates.byId,
      options,
      mergedProps
    );
    return Promise.resolve(template);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTemplates = async (opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    const {
      limit,
      offset,
      deleted_at,
      id,
      is_available_for_new_content,
      label,
      path
    } = opts;

    const additionalOpts = {
      limit,
      offset,
      deleted_at,
      id,
      is_available_for_new_content,
      label,
      path
    };

    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      additionalOpts
    );
    const method = 'GET';
    const options = { method };
    const templates = await createRequest(
      constants.api.templates.base,
      options,
      mergedProps
    );
    return Promise.resolve(templates);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateAutosaveBuffer = async (templateId, body) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'PUT';
    const options = { method, templateId, body };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const updatedBuffer = await createRequest(
      constants.api.templates.buffer,
      options,
      mergedProps
    );
    return Promise.resolve(updatedBuffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getUpdatedAutosaveBuffer = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const updatedBuffer = await createRequest(
      constants.api.templates.buffer,
      options,
      mergedProps
    );
    return Promise.resolve(updatedBuffer);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const hasBufferedChanges = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const updatedBuffer = await createRequest(
      constants.api.templates.hasBufferedChanges,
      options,
      mergedProps
    );

    return updatedBuffer.has_changes;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const pushBufferedChangesLive = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { method: 'POST', templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(
      constants.api.templates.pushBufferLive,
      options,
      mergedProps
    );
    return true;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getVersions = async templateId => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const versions = await createRequest(
      constants.api.templates.versions,
      options,
      mergedProps
    );
    return versions;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getVersion = async (templateId, versionId) => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { templateId, versionId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    await createRequest(constants.api.templates.version, options, mergedProps);
    return true;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const restoreVersion = async (templateId, version_id) => {
  try {
    requiresAuthentication(_baseOptions);
    const options = { method: 'POST', templateId, body: { version_id } };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const response = await createRequest(constants.api.templates.restore, options, mergedProps);
    return response;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function templatesApi(baseOptions) {
  _baseOptions = baseOptions;
  return {
    /**
     * Update a template for a portal
     * @async
     * @memberof hs/templates
     * @method updateTemplate
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.updateTemplate(opts).then(response => console.log(response));
     * @property {string} opts.template_id
     * @property {string} opts.source
     */
    updateTemplate,
    /**
     * Create a template for a portal (see https://developers.hubspot.com/docs/methods/templates/post_templates)
     * @async
     * @memberof hs/templates
     * @method createTemplate
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.createTemplate(opts).then(response => console.log(response));
     * @property {number} opts.category_id
     * @property {string} opts.folder
     * @property {number} opts.template_type
     * @property {string} opts.path
     * @property {string} opts.source
     * @property {string} opts.is_available_for_new_content
     */
    createTemplate,
    /**
     * Delete a template by id (see https://developers.hubspot.com/docs/methods/templates/delete_templates_template_id)
     * @async
     * @memberof hs/templates
     * @method deleteTemplate
     * @param {number} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.deleteTemplate(id).then(response => console.log(response));
     */
    deleteTemplate,
    /**
     * Get a template by id (see https://developers.hubspot.com/docs/methods/templates/get_templates_template_id)
     * @async
     * @memberof hs/templates
     * @method getTemplate
     * @param {number} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.getTemplate(id).then(response => console.log(response));
     */
    getTemplate,
    /**
     * Get the list of templates
     * @async
     * @memberof hs/templates
     * @method getTemplates
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * const opts = { limit: 10 };
     * // Get the first 10 templates
     * hs.templates.getTemplates(opts).then(response => console.log(response));
     * @property {string} opts.limit
     * @property {string} opts.offset
     * @property {string} opts.deleted_at
     * @property {int} opts.id
     * @property {boolean} opts.is_available_for_new_content
     * @property {string} opts.label
     * @property {string} opts.path
     */
    getTemplates,
    /**
     * Update the autosave buffer for a template (see https://developers.hubspot.com/docs/methods/templates/put_templates_template_id_buffer)
     * @async
     * @memberof hs/templates
     * @method updateAutosaveBuffer
     * @param {number} id
     * @param {object} body
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.updateAutosaveBuffer(id, body).then(response => console.log(response));
     */
    updateAutosaveBuffer,
    /**
     * Get the autosave buffer for a template (see https://developers.hubspot.com/docs/methods/templates/put_templates_template_id_buffer)
     * @async
     * @memberof hs/templates
     * @method getUpdatedAutosaveBuffer
     * @param {number} id
     * @param {object} body
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.getUpdatedAutosaveBuffer(id).then(response => console.log(response));
     * @property {number} id
     */
    getUpdatedAutosaveBuffer,
    /**
     * Determine if the auto-save buffer differs from the live Template (see https://developers.hubspot.com/docs/methods/templates/get_templates_template_id_has_buffered_changes)
     * @async
     * @memberof hs/templates
     * @method hasBufferedChanges
     * @param {number} id
     * @returns {boolean}
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.hasBufferedChanges(id).then(response => console.log(response));
     */
    hasBufferedChanges,
    /**
     * Copies the contents of the auto-save buffer into the live Template (see https://developers.hubspot.com/docs/methods/templates/post_templates_template_id_push_buffer_live)
     * @async
     * @memberof hs/templates
     * @method pushBufferedChangesLive
     * @param {number} id
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.pushBufferedChangesLive(id).then(response => console.log(response));
     */
    pushBufferedChangesLive,
    /**
     * List previous versions of the Template (see https://developers.hubspot.com/docs/methods/templates/get_templates_template_id_versions)
     * @async
     * @memberof hs/templates
     * @method getVersions
     * @param {number} id
     * @returns {array}
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.getVersions(id).then(response => console.log(response));
     */
    getVersions,
    /**
     * Get the previous version of the Template(see https://developers.hubspot.com/docs/methods/templates/get_templates_template_id_versions_version_id)
     * @async
     * @memberof hs/templates
     * @method getVersion
     * @param {number} templateId
     * @param {number} versionId
     * @returns {object}
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.getVersion(templateId, versionId).then(response => console.log(response));
     */
    getVersion,
    /**
     * Restore a previous version of the Template (see https://developers.hubspot.com/docs/methods/templates/post_templates_template_id_versions_restore)
     * @async
     * @memberof hs/templates
     * @method restoreVersion
     * @param {number} templateId
     * @param {number} versionId
     * @returns {object}
     * @example
     * const hs = new HubSpotClient(props);
     * hs.templates.restoreVersion(templateId, versionId).then(response => console.log(response));
     */
    restoreVersion
  };
}
