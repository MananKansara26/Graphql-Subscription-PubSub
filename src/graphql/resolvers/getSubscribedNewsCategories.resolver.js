const getSubscribedNewsCategories = async (_, __, { models: { User }, req }) => {
  const user = await User.findOne({ _id: req.user._id }, { subscribedNewsCategories: 1 });
  if (!user) throw new GraphQLError("User does not exists");
  return user.subscribedNewsCategories;
};

module.exports = getSubscribedNewsCategories;