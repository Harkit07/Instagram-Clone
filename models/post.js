const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment.js");

const postSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  file: {
    url: String,
    filename: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  collaboration: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  location: String,
  caption: String,
});

postSchema.post("findOneAndDelete", async (post) => {
  if (post) {
    await Comment.deleteMany({ _id: { $in: post.comments } });
  }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
