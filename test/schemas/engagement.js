const joi = require('joi');

const schemaEngagement = joi.object().allow('null');
// .keys({
//   associations: joi.object().allow(null),
//   engagement: joi.object(),
//   attachments: joi.array(),
//   metadata: joi.object()
// });

module.exports = {
  schemaEngagement,
  validate: joi.validate
};
