[![Build Status (Release)](https://github.com/hubspotwebteam/hs-node-api/workflows/Build%20and%20publish%20npm%20package/badge.svg)](https://github.com/HubSpotWebTeam/hs-node-api/actions?workflow=Build+and+publish+npm+package)
# Hubspot Client API

> ## IMPORTANT!
> :warning: This package is now deprecated and no longer maintained, please use the `@hubspot/api-client` instead.

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
// or const hs = new HubSpotClient(); # for public methods, eg. Forms, HubDB

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

- Blogs
- Blog posts
- Blog authors
- Blog topics
- Contacts
- Contacts Properties (partial implementation)
- Companies
- Calendar
- Deals (partial implementation)
- Domains
- Email Events (partial implementation)
- Engagements (partial implementation)
- Forms (partial implementation)
- HubDB (partial implementation)
- Layouts
- Page Publishing
- Social (partial implementation)
- Workflows

Please check out the full documentation available at https://hubspotwebteam.github.io/hs-node-api/

## CORS

At the moment of writing the HubSpot APIs do not support CORS / AJAX requests due to [security reasons](https://developers.hubspot.com/docs/faq/do-hubspot-apis-support-ajax-request), so you must use this library only on a Node.js server.

## Authors and Contributors

Currently maintained by the lovely folks on HubSpot's Web Team, but we need your help. Please feel free to submit pull requests to add new functionality.

### How to Contribute

Contributions are welcome. Please refer to the [contributing guidelines](https://github.com/HubSpotWebTeam/hs-node-api/blob/master/CONTRIBUTING.md)
