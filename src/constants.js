export default {
  api: {
    blog: {
      authors: 'https://api.hubapi.com/blogs/v3/blog-authors',
      authorById: 'https://api.hubapi.com/blogs/v3/blog-authors/{id}',
      authorSearch: 'https://api.hubapi.com/blogs/v3/blog-authors/search',
      comments: 'https://api.hubapi.com/comments/v3/comments',
      commentById: 'https://api.hubapi.com/comments/v3/comments/{id}',
      restoreDeletedComment: 'https://api.hubapi.com/comments/v3/comments/{id}/restore',
      getAll: 'https://api.hubapi.com/content/api/v2/blogs',
      byId: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}',
      getVersions: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}/versions',
      getVersion: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}/versions/{revision_id}',
      posts: 'https://api.hubapi.com/content/api/v2/blog-posts',
      postById: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}',
      clonePostById: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/clone',
      restorePostById: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/restore-deleted',
      publishOrSchedulePost: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/publish-action',
      postAutoSaveBuffer: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/buffer',
      validatePostAutoSaveBuffer: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/validate-buffer',
      postAutoSaveBufferStatus: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/has-buffered-changes',
      postVersions: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/versions',
      restorePostVersion: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/versions/restore',
      postVersionById: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/versions/{version_id}',
      pushPostAutosaveBufferToLive: 'https://api.hubapi.com/content/api/v2/blog-posts/{id}/push-buffer-live',
      topics: 'https://api.hubapi.com/blogs/v3/topics',
      topicSearch: 'https://api.hubapi.com/blogs/v3/topics/search'
    },
    calendar: {
      events: 'https://api.hubapi.com/calendar/v1/events',
      createTask: 'https://api.hubapi.com/calendar/v1/events/task',
      taskById: 'https://api.hubapi.com/calendar/v1/events/task/{taskId}'
    },
    contacts: {
      byId: 'https://api.hubapi.com/contacts/v1/contact/vid/{vid}/profile',
      byEmail: 'https://api.hubapi.com/contacts/v1/contact/email/{email}/profile',
      createContact: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/{email}/',
      batchUpdateContacts: 'https://api.hubapi.com/contacts/v1/contact/batch/'
    },
    company: {
      create: 'https://api.hubapi.com/companies/v2/companies/',
      batchUpdate: 'https://api.hubapi.com/companies/v1/batch-async/update',
      byId: 'https://api.hubapi.com/companies/v2/companies/{companyId}',
      byDomain: 'https://api.hubapi.com/companies/v2/domains/{domain}/companies'
    }
  }
};
