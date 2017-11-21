import dotenv from 'dotenv';
import HubSpotAPI from '../src';

dotenv.config();
const { HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotAPI({ hapikey });

const blogPosts = hs.blog.getPosts({ name: 'Inbound' });

Promise.resolve(blogPosts).then(res => {
  // console.log(responses.map(() => 'Done'))
  console.log(res);
}).catch(e => {
  console.log(e);
});
