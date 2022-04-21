const joi = require('joi');

const schemaSubscription = joi.object().keys({
  id: joi.number(),
  createdAt: joi.number(),
  createdBy: joi.number().allow(null),
  subscriptionDetails: joi.object().keys({
    subscriptionType: joi.string(),
    propertyName: joi.string(),
    propertyMaybe: joi.string().allow(null)
  }),
  enabled: joi.boolean(),
  createdViaApi: joi.boolean()
});

const schemaSubscriptions = joi.array().items(schemaSubscription);
module.exports = {
  schemaSubscription,
  schemaSubscriptions,
  validate: joi.validate
};
