import contactsApi from './entities/contacts';
import companyApi from './entities/company';
import calendarApi from './entities/calendar';

class HubSpotAPI {
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
    } else {
      const contacts = contactsApi(props);
      const company = companyApi(props);
      const calendar = calendarApi(props);
      Object.assign(this, { contacts, company, calendar });
    }
  }
}

module.exports = HubSpotAPI;
