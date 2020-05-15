const joi = require('joi');

const schemaFile = joi.object().keys({
  name: joi.string(),
  id: joi.number(),
}).unknown();

const limit = joi
  .number()
  .integer()
  .min(0)
  .required();
const offset = joi
  .number()
  .integer()
  .min(0)
  .required();
const total_count = joi
  .number()
  .integer()
  .min(0)
  .required();

const schemaFiles = joi.object().keys({
  limit,
  offset,
  total_count,
  objects: joi
    .array()
    .items(schemaFile)
    .min(1)
});

module.exports = {
  schemaFiles,
  schemaFile,
  validate: joi.validate
};
