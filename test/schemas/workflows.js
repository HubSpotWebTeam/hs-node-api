const joi = require('joi');
const pick = require('lodash.pick');

const baseKeys = {
  type: joi.string().allow('').allow(null),
  name: joi.string().allow('').allow(null),
  actions: joi.array().allow(null),
  id: joi.number(),
  description: joi.string().allow('').allow(null),
  enabled: joi.boolean(),
  portalId: joi.number(),
  isSegmentBased: joi.boolean(),
  listening: joi.boolean(),
  nurtureTimeRange: joi.object().allow('').allow(null),
  onlyExecOnBizDays: joi.boolean(),
  insertedAt: joi.number(),
  updatedAt: joi.number(),
  recurringSetting: joi.object().allow('').allow(null),
  enrollOnCriteriaUpdate: joi.boolean(),
  onlyEnrollsManually: joi.boolean(),
  creationSource: joi.object().allow(null),
  updateSource: joi.object().allow(null),
  allowContactToTriggerMultipleTimes: joi.boolean(),
  unenrollmentSetting: joi.object().allow('').allow(null),
  segmentCriteria: joi.array(),
  goalCriteria: joi.array(),
  reEnrollmentTriggerSets: joi.array(),
  triggerSets: joi.array(),
  suppressionListIds: joi.array(),
  lastUpdatedBy: joi.string().allow('').allow(null),
  metaData: joi.object().allow('').allow(null),
  migrationStatus: joi.object().allow('').allow(null)
};

const keysRequiredInCollection = Object.assign({
  lastUpdatedByUserId: joi.number(),
  personaTagIds: joi.array().allow(null),
  contactListIds: joi.object(),
  contactCounts: joi.object(),
  originalAuthorUserId: joi.number()
}, pick(baseKeys, [
  'type',
  'name',
  'id',
  'description',
  'enabled',
  'portalId',
  'insertedAt',
  'updatedAt',
  'creationSource',
  'updateSource',
  'migrationStatus'
]));


const schemaWorkflow = joi.object().keys(baseKeys);
const schemaWorkflows = joi.object().keys({
  workflows: joi.array().items(joi.object().keys(keysRequiredInCollection))
});

module.exports = {
  schemaWorkflows,
  schemaWorkflow,
  validate: joi.validate
};
