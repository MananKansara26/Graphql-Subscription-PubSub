const subscribeNewsCategories = async (_, { newsCategories }, { models: { User }, req }) => {
  const userId = req.user._id;
  const subscribedNewsCategories = Array.from(new Set(newsCategories));
  await User.updateOne({ _id: userId }, { $set: { subscribedNewsCategories } });
  return subscribedNewsCategories;
};

module.exports = subscribeNewsCategories;