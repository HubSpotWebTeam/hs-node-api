const joi = require('joi');

const schemaDailyLimit = joi.object().keys({
  name: joi.string(),
  usageLimit: joi.number(),
  currentUsage: joi.number(),
  collectedAt: joi.number(),
  fetchStatus: joi.string(),
  resetsAt: joi.number(),
});

module.exports = {
  schemaDailyLimit,
  validate: joi.validate
};
