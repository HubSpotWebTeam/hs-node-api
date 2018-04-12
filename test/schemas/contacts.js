const joi = require('joi');

const schemaContact = joi.object().keys({
  addedAt: joi.number(),
  vid: joi.number(),
  'canonical-vid': joi.number(),
  'merged-vids': joi.array(),
  'portal-id': joi.number(),
  'is-contact': joi.boolean(),
  'profile-token': joi.string(),
  'profile-url': joi.string(),
  properties: joi.object(),
  'form-submissions': joi.array(),
  'identity-profiles': joi.array(),
  'merge-audits': joi.array()
});

const schemaContacts = joi.object().keys({
  'has-more': joi.boolean(),
  'vid-offset': joi.number(),
  contacts: joi.array().items(schemaContact)
});

module.exports = {
  schemaContacts,
  schemaContact,
  validate: joi.validate
};
