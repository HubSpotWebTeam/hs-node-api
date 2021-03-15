require('dotenv').config();
const { expect } = require('chai');
const HubSpotClient = require('../src/index').default;

const {
  E2E_TESTS_HAPI_KEY: hapikey,
  E2E_TESTS_CONTACT_EMAIL,
  E2E_TESTS_EMAIL_ID,
} = process.env;

const hs = new HubSpotClient({ hapikey });

// FIXME: Returns a 403 because of 
// "This app hasn't been granted all required scopes to make this call. Read more about required scopes here: https://developers.hubspot.com/scopes."
xdescribe('Transactional Emails', () => {
  describe('Single Send API', () => {
    it('Sends an email', async () => {
      const emailId = E2E_TESTS_EMAIL_ID;
      const message = {
        to: E2E_TESTS_CONTACT_EMAIL
      };

      const {
        sendResult,
        message: responseMessage,
        eventId
      } = await hs.transactionalEmails.singleSend(emailId, message);

      expect(sendResult).not.to.be('');
      expect(responseMessage).not.to.be('');
      if (sendResult === 'SENT') {
        expect(eventId).not.to.be('');
      }

      return Promise.resolve();
    });
  });
});
