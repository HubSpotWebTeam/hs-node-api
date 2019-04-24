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

// const uploadFile = async (opts = {}) => {
//   try {
//     const {
//       overwrite,
//       hidden,
//       file_names,
//       files,
//       folder_paths,
//       folder_id
//     } = opts;

//     const method = 'POST';
//     const body = {
//       file_names,
//       files,
//       folder_paths,
//       folder_id
//     };

//     const mergedProps = Object.assign({}, defaults, _baseOptions, {
//       overwrite,
//       hidden
//     });

//     const author = await createRequest(
//       constants.api.files.upload, {
//         method,
//         body
//       },
//       mergedProps
//     );
//     return Promise.resolve(author);
//   } catch (e) {
//     return Promise.reject(e.message);
//   }
// };

export default function filesApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    // uploadFile,
    getFilesInFolder
  };
}
