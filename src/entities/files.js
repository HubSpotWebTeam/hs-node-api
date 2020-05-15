import createRequest, { requiresAuthentication } from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const getFilesInFolder = async (folder_id, opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    let { limit, offset } = opts;
    limit = limit || 100;
    offset = offset || 0;

    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      folder_id,
      limit,
      offset
    });

    const files = await createRequest(
      constants.api.files.getFilesInFolder,
      {},
      mergedProps
    );
    return Promise.resolve(files);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getFolders = async (parent_folder_id, opts = {}) => {
  try {
    requiresAuthentication(_baseOptions);
    let { limit, offset } = opts;
    limit = limit || 100;
    offset = offset || 0;

    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      parent_folder_id,
      limit,
      offset
    });

    const folders = await createRequest(
      constants.api.files.getFolders,
      {},
      mergedProps
    );
    return Promise.resolve(folders);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function filesApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Retrieve all folder types
     * @async
     * @memberof hs/files
     * @method getFilesInFolder
     *
     * @param {number} folderId The ID for the specific folder in the file manager
     * @param {object} folderProperties An object containing folder properties to search for
     * @property {number} folderProperties.limit the number of results default 20
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.files.getFilesInFolder(123456789, folderProperties).then(response => console.log(response))
     */
    getFilesInFolder,
    /**
     * Retrieve all folder types
     * @async
     * @memberof hs/files
     * @method getFolders
     *
     * @param {number} parentFolderId The ID for the specific parent folder in the file manager
     * @param {object} folderProperties An object containing folder properties to search for
     * @property {number} folderProperties.limit the number of results default 20
     *
     * @returns {Promise}
     *
     * @example
     * const hs = new HubspotClient(props);
     * hs.files.getFolders(123456789, folderProperties).then(response => console.log(response))
     */
    getFolders
  };
}
