const { NEWS_TYPES } = require('./../../utils/constants.js');

const getNewsCategories = () => {
  return NEWS_TYPES;
};

module.exports = getNewsCategories;