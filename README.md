# Hubspot Client API

A client wrapper for the HubSpot API at https://developers.hubspot.com/docs/overview.

## Example

```
const HubSpotAPI = require('hs-api');
const hs = new HubSpotAPI({ hapikey });
// or const hs = new HubSpotAPI({ accessToken });

async function getContact(id){
  const contact = await hs.contacts.getById(827398123);
  return contact
}

// Or using traditional thenable Promises.
hs.contacts.getById(827398123).then(contact => {
  console.log(contact);
});
```

Entities available

* Blogs
* Blog posts
* Blog authors
* Blog topics
* Contacts
* Companies
* Calendar
* Deals (partial implementation)
* Domains
* Email Events (partial implementation)
* Forms (partial implementation)
* Layouts
* Social (partial implementation)
* Workflows (partial implementation)

Please check out the `docs` folder in the node_modules directory, which has a JSDoc for all currently implemented modules/methods.

## Authors and Contributors

Currently maintained by the lovely folk on HubSpots Web Team, but we need your help. Please feel free to reach out to us.
