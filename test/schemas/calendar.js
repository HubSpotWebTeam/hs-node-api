const joi = require('joi');

const schemaEvent = joi.object();
const schemaEvents = joi.array().items(schemaEvent);

module.exports = {
  schemaEvents,
  schemaEvent,
  validate: joi.validate
};
