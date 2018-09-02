const joi = require('joi');

const schemaRow = joi.object().keys({
  id: joi.number(),
  createdAt: joi.number(),
  path: joi.string(),
  hs_path: joi.string().optional(),
  hs_name: joi.string().optional(),
  name: joi.string(),
  values: joi.object(),
  isSoftEditable: joi.boolean()
});

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

const schemaRows = joi.object().keys({
  limit,
  offset,
  total,
  totalCount,
  message,
  objects: joi
    .array()
    .items(schemaRow)
    .min(1)
});

module.exports = {
  schemaTables,
  schemaTable,
  schemaRows,
  validate: joi.validate
};
