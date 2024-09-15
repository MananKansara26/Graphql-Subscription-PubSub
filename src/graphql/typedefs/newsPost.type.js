const newsPost = `
  type NewsPost {
    _id: String!
    newsCategory: NewsCategory!
    content: String!
    createdAt: String!
    updatedAt: String!
  }
  
  enum NewsCategory {
    BREAKING
    NATIONAL
    SPORTS
    BUSINESS
    LIFESTYLES
    TECHNOLOGY
    ENTERTAINMENT
  }
`;

module.exports = newsPost;