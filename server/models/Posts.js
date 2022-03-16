const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
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
  comments: [
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
          type: String
        }
      }
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
