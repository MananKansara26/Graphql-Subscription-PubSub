const authPayload = require('./authPayload.type');
const user = require('./user.type');
const newsPost = require('./newsPost.type');

const rootTypes = `
  type Query {
    """Fetches a list of available news categories."""
    getNewsCategories: [String]

    """Fetches paginated news posts from a specific news category."""
    getNewsPosts(page: Int!, newsCategory: NewsCategory!): [NewsPost]

    """Fetches the list of news categories the user is subscribed to. Requires user token with Bearer in the Authorization header."""
    getSubscribedNewsCategories: [NewsCategory]
  }

  type Mutation {
    """Registers a new user with an email and password."""
    signUp(email: String!, password: String!): AuthPayload

    """Authenticates a user and generates a new JWT token."""
    signIn(email: String!, password: String!): AuthPayload

    """Subscribes the user to a list of news categories. Requires user token with Bearer in the Authorization header."""
    subscribeNewsCategories(newsCategories: [NewsCategory]!): [String]

    """Creates a new post in a specific news category. Requires admin token with Bearer in the Authorization header."""
    createNewsPost(newsCategory: NewsCategory!, content: String!): NewsPost
  }

  type Subscription {
    """Subscribes to new posts created in any news category. Requires user token with Bearer in the Authorization header."""
    newsPostCreated: NewsPost
  }
`;

module.exports = [rootTypes, authPayload, user, newsPost];