const joi = require('joi');

const schemaTemplate = joi.object();
module.exports = {
  schemaTemplate,
  validate: joi.validate
};
