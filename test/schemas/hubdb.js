const joi = require('joi');

const schemaRow = joi.object().keys({
  id: joi.number(),
  createdAt: joi.number(),
  name: joi.string().allow(null),
  path: joi.string().allow(null),
  hs_path: joi.string().optional(),
  hs_name: joi.string().optional(),
  values: joi.object(),
  isSoftEditable: joi.boolean(),
  childTableId: joi.number().optional()
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
    .items(joi.object())
    .min(1)
});

module.exports = {
  schemaTables,
  schemaRow,
  validate: joi.validate
};
