const joi = require('joi');

const schemaContactsProperty = joi.object().allow(null);
// .keys({
//   name: joi.string(),
//   label: joi
//     .string()
//     .allow(null)
//     .allow(''),
//   description: joi.string().allow(''),
//   groupName: joi.string(),
//   type: joi.string(),
//   fieldType: joi.string(),
//   createdAt: joi.number().allow(null),
//   readOnlyDefinition: joi.boolean(),
//   updatedAt: joi.number().allow(null),
//   formField: joi.boolean(),
//   displayOrder: joi.number(),
//   readOnlyValue: joi.boolean(),
//   hidden: joi.boolean(),
//   mutableDefinitionNotDeletable: joi.boolean(),
//   favorited: joi.boolean(),
//   favoritedOrder: joi.number(),
//   calculated: joi.boolean(),
//   externalOptions: joi.boolean(),
//   hubspotDefined: joi.boolean().allow(null),
//   displayMode: joi.string(),
//   showCurrencySymbol: joi.boolean().allow(null),
//   searchTextAnalysisMode: joi.string().allow(null),
//   optionSortStrategy: joi.string().allow(null),
//   createdUserId: joi.number().allow(null),
//   textDisplayHint: joi.string().allow(null),
//   numberDisplayHint: joi.string().allow(null),
//   optionsAreMutable: joi.boolean().allow(null),
//   referencedObjectType: joi.string().allow(null),
//   isCustomizedDefault: joi.boolean(),
//   searchableInGlobalSearch: joi.boolean(),
//   currencyPropertyName: joi.string().allow(null),
//   hasUniqueValue: joi.boolean(),
//   deleted: joi.boolean().allow(null),
//   updatedUserId: joi.number().allow(null),
//   options: joi.array()

const schemaContactsProperties = joi.array().items(schemaContactsProperty);

module.exports = {
  schemaContactsProperties,
  schemaContactsProperty,
  validate: joi.validate
};
