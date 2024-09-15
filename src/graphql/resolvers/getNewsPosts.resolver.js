const { PAGE_LIMIT } = require('./../../utils/constants');

const getNewsPosts = async (_, { page, newsCategory }, { models: { Post } }) => {
  const limit = PAGE_LIMIT;
  const skip = (page - 1) * limit;
  return Post.find({ newsCategory }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
};

module.exports = getNewsPosts;