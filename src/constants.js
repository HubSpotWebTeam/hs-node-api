export default {
  api: {
    blog: {
      getAuthors: 'https://api.hubapi.com/blogs/v3/blog-authors',
      searchAuthors: 'https://api.hubapi.com/blogs/v3/blog-authors/search',
      getAll: 'https://api.hubapi.com/content/api/v2/blogs',
      getById: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}',
      getVersions: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}/versions',
      getVersion: 'https://api.hubapi.com/content/api/v2/blogs/{blog_id}/versions/{revision_id}',
      getPosts: 'https://api.hubapi.com/content/api/v2/blog-posts'
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
