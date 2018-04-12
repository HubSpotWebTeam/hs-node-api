const joi = require('joi');

const schemaEvent = joi.object().keys({
  id: joi.number(),
  eventType: joi.string().allow(''),
  eventDate: joi.number(),
  category: joi.string().allow(''),
  categoryId: joi.number(),
  contentId: joi.number(),
  state: joi.string().allow(''),
  campaignGuid: joi.string().allow(''),
  portalId: joi.number(),
  name: joi.string().allow(''),
  description: joi.string().allow(''),
  url: joi
    .string()
    .allow('')
    .allow(null),
  ownerId: joi.number(),
  createdBy: joi.number(),
  previewKey: joi
    .string()
    .allow('')
    .allow(null),
  socialUsername: joi
    .string()
    .allow('')
    .allow(null),
  socialDisplayName: joi
    .string()
    .allow('')
    .allow(null),
  avatarUrl: joi
    .string()
    .allow('')
    .allow(null),
  templatePath: joi
    .string()
    .allow('')
    .allow(null),
  topicIds: joi.array().allow(null),
  userIds: joi.array().allow(null),
  contentGroupId: joi.number().allow(null),
  createContent: joi.boolean(),
  startedDate: joi.number(),
  publishDate: joi.number(),
  isRecurring: joi.boolean(),
  userId: joi.number()
});

const schemaEvents = joi.array().items(schemaEvent);

module.exports = {
  schemaEvents,
  schemaEvent,
  validate: joi.validate
};
