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

- Blogs
- Blog posts
- Blog authors
- Blog topics
- Contacts
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

## Authors and Contributors

Currently maintained by the lovely folks on HubSpot's Web Team, but we need your help. Please feel free to submit pull requests to add new functionality.

### How to Contribute

Clone this repository and create a `.env` file in the root of your folder for all `process.env` tokens, such as the HAPIkey, for example:

```
E2E_TESTS_HAPI_KEY="your-hapi-key"
E2E_TESTS_BLOG_ID="1234567"
E2E_TESTS_WORKFLOW_ID="9876542"
E2E_TESTS_CONTACT_EMAIL="coolrobot@hubspot.com"
E2E_TESTS_CONTACT_ID="1234"
E2E_TESTS_HUBDB_TABLE_ID="999999"
E2E_TESTS_HUBDB_PORTAL_ID="111111"
```

Test with `npm run prepare`.

All set? Open a pull request!
