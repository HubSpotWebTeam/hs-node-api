# Hubspot Client API

A client wrapper for the HubSpot API at https://developers.hubspot.com/docs/overview.

## Installation

```
npm install --save hubspot-api
```

## Docs

Full documentation available at https://hubspotwebteam.github.io/hs-node-api/

## Example

```
const HubSpotClient = require('hubspot-api');
const hs = new HubSpotClient({ hapikey });
// or const hs = new HubSpotClient({ accessToken });

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
* Page Publishing
* Social (partial implementation)
* Workflows

Please check out the full documentation available at https://hubspotwebteam.github.io/hs-node-api/

## Authors and Contributors

Currently maintained by the lovely folk on HubSpots Web Team, but we need your help. Please feel free to reach out to us.
