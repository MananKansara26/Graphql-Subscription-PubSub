const { rule, shield, allow } = require('graphql-shield');
const { GraphQLError } = require('graphql');
const getUserFromToken = require('../utils/getUserFromToken');

const isUser = rule()(async (_, __, { req }) => {
  const user = await getUserFromToken(req.headers.authorization);

  if (!user || (user.role !== 'USER')) throw new GraphQLError('Forbiddecn');
  req.user = user;
  return true;
});

const isAdmin = rule()(async (_, __, { req }) => {
  const user = await getUserFromToken(req.headers.authorization);

  if (!user || (user.role !== 'ADMIN')) throw new GraphQLError('Forbiddecn');
  req.user = user;
  return true;
});

module.exports = shield(
  {
    Query: {
      getSubscribedNewsCategories: isUser,
      "*": allow
    },
    Mutation: {
      subscribeNewsCategories: isUser,
      createNewsPost: isAdmin,
      "*": allow
    }
  },
  { allowExternalErrors: true },
);