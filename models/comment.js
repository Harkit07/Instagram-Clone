const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  about: {
    type: String,
  },
  like: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
