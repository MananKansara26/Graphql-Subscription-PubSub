const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    newsCategory: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;