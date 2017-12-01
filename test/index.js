import dotenv from 'dotenv';
import HubSpotAPI from '../src';

dotenv.config();
const { HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotAPI({ hapikey });
// 2396816
const workflowInfo = hs.workflows.getWorkflow(2396816);

// const blogPosts = hs.blog.getPosts({ name: 'Inbound' });

Promise.resolve(workflowInfo).then(res => {
  // console.log(responses.map(() => 'Done'))
  console.log(res);
}).catch(e => {
  console.log(e);
});
