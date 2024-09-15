require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { useServer } = require('graphql-ws/lib/use/ws');
const { applyMiddleware } = require('graphql-middleware');
const schema = require('./graphql');
const shield = require('./graphql/shield');
const getUserFromToken = require('./utils/getUserFromToken');
const models = require('./models');

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

// create server for websocket
const wsServer = new WebSocketServer({
  server: httpServer, // bind WebSocket server to httpServer 
  path: '/graphql', // restrict the WebSocket connection to the /graphql path
});

// useServer configures that WebSocket server to handle GraphQL subscriptions.
const serverCleanup = useServer({
  schema,

  // subscription context
  context: async (ctx) => {
    try {
      const user = await getUserFromToken(ctx.connectionParams.Authorization);
      return { user, models };
    } catch (error) {
      throw new Error(error);
    }
  }
}, wsServer);

// set up ApolloServer
const server = new ApolloServer({
  // apply shield middleware to entire GraphQL shcema
  schema: applyMiddleware(schema, shield),

  // handle grpahql errors
  formatError: (formattedError) => {
    return {
      message: formattedError.message || 'Something went wrong!',
      status: 400
    };
  },

  plugins: [
    // proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },

    // landing page configuration for non-production environments
    ApolloServerPluginLandingPageLocalDefault({
      embed: {
        endpointIsEditable: true
      }
    })
  ],
});

(async () => {
  // start graphql server
  await server.start();

  // apply the Apollo server as middleware for the /graphql route
  app.use('/graphql', cors(), express.json(), expressMiddleware(server, {
    // context for resolvers (except subscription)
    context: async ({ req }) => ({ req, models }),
  }));
})();

// connect to mongodb
mongoose.connect(MONGODB_URL).then(() => {
  console.log("Connected to mongodb");
  httpServer.listen(PORT, () => {
    console.log(`Server is now running at /graphql on port ${PORT}.`);
  });
})