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
// responses = [
//   hs.blog.createOrUpdateTopic({ name: 'Topic 1', description: 'A fuller description' }),
//   hs.blog.createOrUpdateTopic({ name: 'Topic 2', description: 'A fuller description' }),
//   hs.blog.createOrUpdateTopic({ name: 'Topic 3', description: 'A fuller description' }),
//   hs.blog.createOrUpdateTopic({ name: 'Topic 4', description: 'A fuller description' })
// ];
//

responses = hs.forms.submitForm('2406023', 'f0a18000-0d25-4800-b92b-baa12243f453', {
  email: 'test@test.ie',
  query: 'Boo urns',
  transcript: 'Testing',
  firstname: 'Freddie',
  lastname: 'Flintoff'
});

// ({
//   topicIds: [
//     5537044461, 5537044459, 5537044460, 5536882856
//   ],
//   groupedTopicName: 'Group name'
// });
Promise.resolve(responses).then(console.log).catch(e => {
  console.log(e);
});
