const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: {
    type: [],
  },
  comments: {
    type: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
