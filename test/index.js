import dotenv from 'dotenv';
import HubSpotAPI from '../src';

dotenv.config();
const { HAPI_KEY: hapikey } = process.env;
const hs = new HubSpotAPI({ hapikey });

let responses;

// responses = hs.blog.createOrUpdateAuthor({
//   // id: 5511638492,
//   email: 'smcelhinney@hubspot.com',
//   fullName: 'Stephen Patrick McElhinney'
// });

// responses = hs.blog.getAuthor(5511676206);
// responses = hs.blog.getComments({ contentId: 5424033819 });
// responses = hs.blog.createOrUpdatePost({
//   id: 4753536483,
//   name: 'How to update a blog post title programmatically'
// });

// responses = hs.blog.clonePost({ id: 5352662876, name: 'New blog post' });
responses = hs.blog.getTopics();
Promise.resolve(responses).then(res => {
  // console.log(responses.map(() => 'Done'))
  // console.log(res.objects.map(obj => obj.id));
  console.log(res);
}).catch(e => {
  console.log(e);
});
