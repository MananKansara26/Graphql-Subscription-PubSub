const signUp = require('./signUp.resolver');
const signIn = require('./signIn.resolver');
const getNewsCategories = require('./getNewsCategories.resolver');
const subscribeNewsCategories = require('./subscribeNewsCategories.resolver');
const getSubscribedNewsCategories = require('./getSubscribedNewsCategories.resolver');
const createNewsPost = require('./createNewsPost.resolver');
const getNewsPosts = require('./getNewsPosts.resolver');
const newsPostCreated = require('./newsPostCreated.resolver');

const resolvers = {
  Query: {
    getNewsCategories,
    getSubscribedNewsCategories,
    getNewsPosts
  },
  Mutation: {
    signUp,
    signIn,
    subscribeNewsCategories,
    createNewsPost,
  },
  Subscription: {
    newsPostCreated
  },
};

module.exports = resolvers;
