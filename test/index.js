import dotenv from 'dotenv';
import HubSpotAPI from '../src';

dotenv.config();

// Linked to Portal ID 2406023 Developer Portal
// const hapikey = 'a714cac4-a45c-42ff-9905-da4dc8838d75';
const { HAPI_KEY } = process.env;
const hs = new HubSpotAPI({ hapikey: HAPI_KEY });

const blogPosts = hs.blog.getPosts({ name: 'Inbound' });

Promise.resolve(blogPosts).then(res => {
  // console.log(responses.map(() => 'Done'))
  console.log(res);
}).catch(e => {
  console.log(e);
});
