import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const uploadFile = async (opts = {}) => {
  try {
    const {
      overwrite,
      hidden,
      file_names,
      files,
      folder_paths,
      folder_id
    } = opts;

    const method = 'POST';
    const body = {
      file_names,
      files,
      folder_paths,
      folder_id
    };

    const mergedProps = Object.assign({}, defaults, _baseOptions, {
      overwrite,
      hidden
    });

    const author = await createRequest(
      constants.api.files.upload,
      { method, body },
      mergedProps
    );
    return Promise.resolve(author);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function workflows(baseOptions) {
  _baseOptions = baseOptions;

  return {
    uploadFile
  };
}
