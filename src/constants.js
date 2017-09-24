module.exports = {
  api: {
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
}
