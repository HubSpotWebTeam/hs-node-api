const joi = require('joi');

const schemaPost = joi.object().keys({
  ab: joi.boolean(),
  ab_variation: joi.boolean(),
  absolute_url: joi.string(),
  allowed_slug_conflict: joi.boolean(),
  analytics_page_id: joi.string(),
  analytics_page_type: joi.string(),
  archived: joi.boolean(),
  are_comments_allowed: joi.boolean(),
  attached_stylesheets: joi.array(),
  author: joi.string(),
  author_at: joi.number(),
  author_email: joi.string().email(),
  author_name: joi.string(),
  author_user_id: joi.number(),
  author_username: joi.string(),
  blog_author: joi.object(),
  blog_author_id: joi.number(),
  blog_post_author: joi.object(),
  blog_post_schedule_task_uid: joi.string(),
  blog_publish_instant_email_retry_count: joi.number(),
  blueprint_type_id: joi.number(),
  campaign: joi.string().allow(''),
  category: joi.number(),
  category_id: joi.number(),
  comment_count: joi.number(),
  composition_id: joi.number(),
  content_group: joi.number(),
  content_group_id: joi.number(),
  created: joi.number(),
  created_time: joi.number(),
  css: joi.object(),
  css_text: joi.string().allow(''),
  ctas: joi
    .object()
    .optional()
    .allow(null),
  current_state: joi.string(),
  currently_published: joi.boolean(),
  deleted_at: joi.number(),
  domain: joi.string().allow(''),
  enable_google_amp_output_override: joi.boolean(),
  featured_image: joi.string().allow(''),
  featured_image_alt_text: joi.string().allow(''),
  featured_image_height: joi.number(),
  featured_image_length: joi.number(),
  featured_image_width: joi.number(),
  flex_areas: joi.object(),
  footer_html: joi.string().allow(''),
  freeze_date: joi.number(),
  has_user_changes: joi.boolean(),
  head_html: joi.string().allow(''),
  html_title: joi.string(),
  id: joi.number(),
  is_captcha_required: joi.boolean(),
  is_draft: joi.boolean(),
  is_instant_email_enabled: joi.boolean(),
  is_published: joi.boolean(),
  is_social_publishing_enabled: joi.boolean(),
  keywords: joi.array(),
  label: joi.string().allow(''),
  link_rel_canonical_url: joi.string().allow(''),
  list_template: joi.string().allow(''),
  live_domain: joi.string().allow(''),
  meta: joi.object(),
  meta_description: joi.string().allow(''),
  name: joi.string().allow(''),
  page_redirected: joi.boolean(),
  page_title: joi.string().allow(''),
  parent_blog: joi.object(),
  performable_variation_letter: joi.string().allow(''),
  personas: joi.array(),
  placement_guids: joi.array(),
  portal_id: joi.number(),
  post_body: joi.string().allow(''),
  post_body_rss: joi.string().allow(''),
  post_email_content: joi.string().allow(''),
  post_featured_image_if_enabled: joi.string().allow(''),
  post_list_content: joi.string().allow(''),
  post_list_summary_featured_image: joi.string().allow(''),
  post_rss_content: joi.string().allow(''),
  post_rss_summary_featured_image: joi.string().allow(''),
  post_summary: joi.string().allow(''),
  post_summary_rss: joi.string().allow(''),
  post_template: joi.string().allow(''),
  preview_key: joi.string().allow(''),
  processing_status: joi.string().allow(''),
  publish_date: joi.number(),
  publish_date_local_time: joi.number(),
  publish_date_localized: joi.object(),
  publish_immediately: joi.boolean(),
  published_url: joi.string().allow(''),
  resolved_domain: joi.string().allow(''),
  rss_body: joi.string().allow(''),
  rss_summary: joi.string().allow(''),
  rss_summary_featured_image: joi.string().allow(''),
  slug: joi.string().allow(''),
  state: joi.string().allow(''),
  subcategory: joi.string().allow(''),
  synced_with_blog_root: joi.boolean(),
  tag_ids: joi.array(),
  tag_list: joi.array(),
  tag_names: joi.array(),
  template_path: joi.string().allow(''),
  template_path_for_render: joi.string().allow(''),
  title: joi.string().allow(''),
  topic_ids: joi.array(),
  topic_list: joi.array(),
  topic_names: joi.array(),
  topics: joi.array(),
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

const totalCount = total_count;

const schemaPosts = joi.object().keys({
  limit,
  offset,
  total,
  total_count,
  objects: joi.array().items(schemaPost)
});

const schemaAuthors = joi.object().keys({
  limit,
  offset,
  total,
  totalCount,
  objects: joi.array()
});

module.exports = {
  schemaPosts,
  schemaPost,
  schemaAuthors,
  validate: joi.validate
};
