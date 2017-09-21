module.exports= {
  api: {
    contacts: {
      byId: 'https://api.hubapi.com/contacts/v1/contact/vid/{vid}/profile',
      byEmail: 'https://api.hubapi.com/contacts/v1/contact/email/{email}/profile',
      createContact: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/{email}/'
    }
  }
}
