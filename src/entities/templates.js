import createRequest, {
  requiresAuthentication,
} from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const updateTemplate = async (templateId, source) => {
  try {
    requiresAuthentication(_baseOptions);
    const method = 'PUT';
    const options = { method, body: source, templateId };
    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const update = await createRequest(constants.api.templates.byId, options, mergedProps);
    return Promise.resolve(update);
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
  };
}
