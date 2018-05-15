const joi = require('joi');

const schemaPage = joi.object().keys({
  ab: joi.boolean(),
  ab_variation: joi.boolean(),
  absolute_url: joi.string().allow(''),
  allowed_slug_conflict: joi.boolean(),
  analytics_page_id: joi.string().allow(''),
  analytics_page_type: joi.string().allow(''),
  archived: joi.boolean(),
  are_comments_allowed: joi.boolean(),
  attached_stylesheets: joi.array(),
  author: joi.string().allow(''),
  author_at: joi.number(),
  author_email: joi.string().email(),
  author_name: joi.string().allow(''),
  author_user_id: joi.number(),
  author_username: joi.string().allow(''),
  blueprint_type_id: joi.number(),
  campaign: joi.string().allow(''),
  campaign_name: joi.string().allow(''),
  category: joi.number(),
  category_id: joi.number(),
  created: joi.number(),
  created_time: joi.number(),
  css: joi.object(),
  css_text: joi.string().allow(''),
  ctas: joi
    .object()
    .optional()
    .allow(null),
  current_state: joi.string().allow(''),
  currently_published: joi.boolean(),
  deleted_at: joi.number(),
  domain: joi.string().allow(''),
  enable_domain_stylesheets: joi.boolean(),
  featured_image: joi.string().allow(''),
  featured_image_alt_text: joi.string().allow(''),
  featured_image_height: joi.number(),
  featured_image_length: joi.number(),
  featured_image_width: joi.number(),
  flex_areas: joi.object(),
  freeze_date: joi.number(),
  has_user_changes: joi.boolean(),
  head_html: joi.string().allow(''),
  html_title: joi.string().allow(''),
  id: joi.number(),
  include_default_custom_css: joi.boolean(),
  is_draft: joi.boolean(),
  is_published: joi.boolean(),
  is_social_publishing_enabled: joi.boolean(),
  keywords: joi.array(),
  label: joi.string().allow(''),
  layout_sections: joi
    .object()
    .optional()
    .allow(null),
  link_rel_canonical_url: joi.string().allow(''),
  live_domain: joi.string().allow(''),
  meta: joi.object(),
  meta_description: joi.string().allow(''),
  name: joi.string().allow(''),
  page_expiry_enabled: joi.boolean(),
  page_redirected: joi.boolean(),
  page_title: joi.string().allow(''),
  performable_guid: joi.string().allow(''),
  personas: joi.array(),
  placement_guids: joi.array(),
  portal_id: joi.number(),
  preview_key: joi.string().allow(''),
  processing_status: joi.string().allow(''),
  publish_date: joi.number(),
  publish_date_local_time: joi.number(),
  publish_date_localized: joi.object(),
  publish_immediately: joi.boolean(),
  published_url: joi.string().allow(''),
  resolved_domain: joi.string().allow(''),
  screenshot_preview_taken_at: joi.number(),
  screenshot_preview_url: joi.string().allow(''),
  site_id: joi.number(),
  slug: joi.string().allow(''),
  state: joi.string().allow(''),
  subcategory: joi.string().allow(''),
  template_path: joi.string().allow(''),
  template_path_for_render: joi.string().allow(''),
  title: joi.string().allow(''),
  translated_content: joi.object(),
  tweet_immediately: joi.boolean(),
  unpublished_at: joi.number(),
  updated: joi.number(),
  upsize_featured_image: joi.boolean(),
  url: joi.string().allow(''),
  use_featured_image: joi.boolean(),
  views: joi.number(),
  widget_containers: joi.object(),
  widgetcontainers: joi.object(),
  widgets: joi.object()
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
const total_count = joi
  .number()
  .integer()
  .min(0)
  .required();

const schemaPages = joi.object().keys({
  limit,
  offset,
  total,
  total_count,
  objects: joi
    .array()
    .items(schemaPage)
    .min(1)
});

module.exports = {
  schemaPages,
  schemaPage,
  validate: joi.validate
};
