import HubSpotAPI from '../src';
// import moment from 'moment';

// Linked to Portal ID 2406023 Developer Portal
const hapikey = 'a714cac4-a45c-42ff-9905-da4dc8838d75';
const hs = new HubSpotAPI({ hapikey });
const createCompany = hs.company.delete(556451462);

Promise.resolve(createCompany).then(res => {
  // console.log(responses.map(() => 'Done'))
  console.log(res);
}).catch(e => {
  console.log(e);
});
