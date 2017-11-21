import contactsApi from './entities/contacts';
import companyApi from './entities/company';
import calendarApi from './entities/calendar';

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
}

module.exports = HubSpotClient;
