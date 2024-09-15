const pubsub = require('./../../utils/pubsub');

const createNewsPost = async (_, { newsCategory, content }, { models: { Post } }) => {
  const post = await Post.create({ content, newsCategory });

  // publish on newCategory topic
  pubsub.publish(newsCategory, {
    newsPostCreated: post
  });
  
  return post; 
};

module.exports = createNewsPost;