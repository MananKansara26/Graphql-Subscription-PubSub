const pubsub = require('./../../utils/pubsub');

const newsPostCreated = {
  subscribe: async (_, __, { models: { User }, user }) => {
    const userData = await User.findOne({ _id: user._id }, { subscribedNewsCategories: 1 });

    // subscribe user new categories
    return pubsub.asyncIterator(userData.subscribedNewsCategories);
  }
};

module.exports = newsPostCreated;