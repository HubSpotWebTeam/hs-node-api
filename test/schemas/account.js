const joi = require('joi');

const schemaAccount = joi.object().keys({
  'access-token': joi.string()
});


module.exports = {
  schemaAccount,
  validate: joi.validate
};
