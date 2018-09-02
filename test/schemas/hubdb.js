const joi = require('joi');

const schemaTable = joi.object().keys({
  id: joi.number(),
  name: joi.string().allow(''),
  portalId: joi.number(),
  createdAt: joi.number(),
  updated: joi.number(),
  publishedAt: joi.number(),
  updatedAt: joi.number(),
  columns: joi.array(),
  label: joi.string(),
  cosObjectType: joi.string(),
  deleted: joi.boolean(),
  cdnPurgeEmbargoTime: joi.number().allow(null),
  rowCount: joi.number(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  useForPages: joi.boolean(),
  columnCount: joi.number()
});

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
const total = joi
  .number()
  .integer()
  .min(0)
  .required();
const message = joi
  .string()
  .required()
  .allow(null);
const totalCount = joi
  .number()
  .integer()
  .min(0)
  .required();

const schemaTables = joi.object().keys({
  limit,
  offset,
  total,
  totalCount,
  message,
  objects: joi
    .array()
    .items(schemaTable)
    .min(1)
});

module.exports = {
  schemaTables,
  schemaTable,
  validate: joi.validate
};
