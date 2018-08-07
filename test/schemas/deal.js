const joi = require('joi');

const schemaDeal = joi.object().keys({
  associations: joi.object().allow(null),
  dealId: joi.number(),
  imports: joi.array(),
  isDeleted: joi.boolean(),
  portalId: joi.number(),
  properties: joi.object(),
  stateChanges: joi.array(),
});

const joiPositiveInteger =
  joi
  .number()
  .integer()
  .min(0);

const limit = joiPositiveInteger;
const offset = joiPositiveInteger;
const count = joiPositiveInteger;
const total = joiPositiveInteger;
const hasMore = joi.boolean();

const schemaDeals = joi.object().keys({
  limit,
  offset,
  hasMore,
  count,
  deals: joi.array().items(schemaDeal)
});

const schemaRecentDeals = joi.object().keys({
  offset,
  hasMore,
  total,
  results: joi.array().items(schemaDeal)
});

module.exports = {
  schemaDeal,
  schemaDeals,
  schemaRecentDeals,
  validate: joi.validate
};
