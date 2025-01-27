const mongoose = require("mongoose");
const initData = require("./data.js");
const commentData = require("./comment.js");
const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

const mongoUrl = "mongodb://127.0.0.1:27017/insta";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  await Post.deleteMany({});
  await Post.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

const initComment = async () => {
  await Comment.deleteMany({});
  await Comment.insertMany(commentData.data);
  console.log("commets was initialized");
};

// initComment();

const findData = async () => {
  let data = await Post.findById("67839b71f0a70484283c96c1").populate(
    "comments"
  );
  console.log(data);
};

// findData();

// Post.findOne({ _id: postId })
//   .populate({
//     path: 'user',
//     select: 'name',  // Optionally select specific fields
//   })
//   .exec((err, post) => {
//     if (err) return console.error(err);
//     console.log(post);
//   });

// const findData = async () => {
//   let comment = await Comment.find({});
//   console.log(comment);
// };

// findData();

const addComment = async () => {
  let post = await Post.findById("67839b71f0a70484283c96c1");
  let newComment = new Comment({
    author: "Eve",
    like: 0,
    about: "This doesnot seem correct to me.",
  });
  post.comments.push(newComment);

  let com = await newComment.save();
  let pst = await post.save();
  console.log(com);
  console.log(pst);
};

// addComment();
