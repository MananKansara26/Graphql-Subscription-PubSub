const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typedefs/index');
const resolvers = require('./resolvers/index');

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;