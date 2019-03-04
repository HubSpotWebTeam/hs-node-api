import accountApi from './entities/account';
import contactsApi from './entities/contacts';
import companyApi from './entities/company';
import calendarApi from './entities/calendar';
import blogPostsApi from './entities/blog';
import workflowsApi from './entities/workflows';
import filesApi from './entities/files';
import domainsApi from './entities/domains';
import layoutsApi from './entities/layouts';
import formsApi from './entities/forms';
import socialApi from './entities/social';
import emailEventsApi from './entities/email-events';
import dealsApi from './entities/deals';
import pagesApi from './entities/pages';
import hubdbApi from './entities/hubdb';
import engagementsApi from './entities/engagements';

/**
* HubSpotClient class
* @example
const HubSpotClient = require('hubspot-api');
const hs = new HubSpotClient({ accessToken: 'i82739813ksjksf' });
// or
const hs = new HubSpotClient({ hapikey: '76128312asa7s8761823761' });
*/

class HubSpotClient {
  /**
   * @param {object} props Constructor props. 1 of hapikey / accessToken is required for authenticated requests. No properties required for public methods
   * @param {string} props.hapikey          - hapikey
   * @param {string} props.accessToken      - accessToken
   * @returns {object}
   */
  constructor(props) {
    Object.assign(this, { props });
  }
  /**
   * A collection of methods related to the Account API
   * @namespace hs/account
   */
  get account() {
    return accountApi(this.props);
  }

  /**
   * A collection of methods related to the Calendar API
   * @namespace hs/calendar
   */
  get calendar() {
    return calendarApi(this.props);
  }

  /**
   * A collection of methods related to the Contacts API
   * @namespace hs/contacts
   */
  get contacts() {
    return contactsApi(this.props);
  }

  /**
   * A collection of methods related to the Comapny API
   * @namespace hs/company
   */
  get company() {
    return companyApi(this.props);
  }

  /**
   * A collection of methods related to the Blog API / Blog Posts API / Blog Authors API
   * @namespace hs/blog
   */
  get blog() {
    return blogPostsApi(this.props);
  }

  /**
   * A collection of methods related to the Workflows API
   * @namespace hs/workflows
   */
  get workflows() {
    return workflowsApi(this.props);
  }

  /**
   * A collection of methods related to the COS Files API
   * @namespace hs/files
   */
  get files() {
    return filesApi(this.props);
  }

  /**
   * A collection of methods related to the Domains API
   * @namespace hs/domains
   */
  get domains() {
    return domainsApi(this.props);
  }

  /**
   * A collection of methods related to the Layouts API
   * @namespace hs/layouts
   */
  get layouts() {
    return layoutsApi(this.props);
  }

  /**
   * A collection of methods related to the Forms API
   * @namespace hs/forms
   */
  get forms() {
    return formsApi(this.props);
  }

  /**
   * A collection of methods related to the Social API
   * @namespace hs/social
   */
  get social() {
    return socialApi(this.props);
  }

  /**
   * A collection of methods related to the Email Events API
   * @namespace hs/emailEvents
   */
  get emailEvents() {
    return emailEventsApi(this.props);
  }

  /**
   * A collection of methods related to the Deals API
   * @namespace hs/deals
   */
  get deals() {
    return dealsApi(this.props);
  }

  /**
   * A collection of methods related to the Page Publishing API
   * @namespace hs/pages
   */
  get pages() {
    return pagesApi(this.props);
  }

  /**
   * A collection of methods related to the HubDB Tables API
   * @namespace hs/hubdb
   */
  get hubdb() {
    return hubdbApi(this.props);
  }

  /**
   * A collection of methods related to the Engagements API
   * @namespace hs/engagements
   */
  get engagements() {
    return engagementsApi(this.props);
  }
}

export default HubSpotClient;
