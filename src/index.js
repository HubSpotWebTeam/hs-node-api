import contactsApi from './entities/contacts';
import companyApi from './entities/company';
import calendarApi from './entities/calendar';
import blogPostsApi from './entities/blog';
import workflowsApi from './entities/workflows';
// import filesApi from './entities/files';
import domainsApi from './entities/domains';
import layoutsApi from './entities/layouts';
import formsApi from './entities/forms';

/** HubSpotClient class */
class HubSpotClient {
  /**
   * @param {object} props Constructor props. 1 of hapikey / accessToken is required
   * @param {string} props.hapikey          - hapikey
   * @param {string} props.accessToken      - accessToken
   * @returns {object}
   */
  constructor(props) {
    let hapikey;
    let accessToken;
    let validProps = true;

    if (!props) {
      validProps = false;
    }
    if (typeof props === 'string') {
      hapikey = props;
    } else if (typeof props === 'object') {
      ({ hapikey, accessToken } = props);
    }

    if (!hapikey && !accessToken) {
      validProps = false;
    }

    if (!validProps) {
      throw new Error('One of accessToken/hapikey required in constructor');
    }
    Object.assign(this, { props });
  }
  /**
  * Get an object representing calendar API
  * @namespace hs/calendar
  * @type {object}
  */
  get calendar() {
    return calendarApi(this.props);
  }
  /** @namespace hs/contacts */
  get contacts() {
    return contactsApi(this.props);
  }
  /** @namespace hs/company */
  get company() {
    return companyApi(this.props);
  }
  /** @namespace hs/blog */
  get blog() {
    return blogPostsApi(this.props);
  }
  /** @namespace hs/workflows */
  get workflows() {
    return workflowsApi(this.props);
  }
  /** @namespace hs/files */
  // get files() {
  //   return filesApi(this.props);
  // }
  /** @namespace hs/domains */
  get domains() {
    return domainsApi(this.props);
  }
  /** @namespace hs/layouts */
  get layouts() {
    return layoutsApi(this.props);
  }
  /** @namespace hs/forms */
  get forms() {
    return formsApi(this.props);
  }
}

export default HubSpotClient;
