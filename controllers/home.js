const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");

module.exports.homePage = async (req, res) => {
  const allPosts = await Post.find({}).populate({
    path: "username",
    populate: {
      path: "following",
      path: "followers",
    },
  });
  const allUsers = await User.find({});
  res.render("pages/home.ejs", { allPosts, allUsers });
};

module.exports.postPage = (req, res) => {
  res.render("pages/postform.ejs");
};

module.exports.uploadPost = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newPost = new Post(req.body.post);
  newPost.file = { url, filename };
  newPost.username = req.user._id;
  req.user.posts.push(newPost);
  await newPost.save();
  await req.user.save();
  res.redirect("/home");
};

module.exports.commentPage = async (req, res) => {
  let { id } = req.params;
  const post = await Post.findById(id).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  });
  res.render("pages/comment.ejs", { post });
};

module.exports.uploadComment = async (req, res) => {
  let post = await Post.findById(req.params.id);
  let newComment = new Comment(req.body.comment);
  newComment.author = req.user._id;
  post.comments.push(newComment);

  await newComment.save();
  await post.save();
  res.redirect(`/home/${post._id}/comment`);
};

module.exports.pageInfo = async (req, res) => {
  res.render("pages/infoPopup.ejs");
};

module.exports.followReq = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  if (user._id.equals(req.user._id)) {
    console.log("you not follow");
  } else {
    let isFollow = true;
    for (let follower of user.followers) {
      if (follower._id.equals(req.user._id)) {
        isFollow = false;
        break;
      } else {
        isFollow = true;
      }
    }
    if (isFollow) {
      user.followers.push(req.user);
      req.user.following.push(user);
      await user.save();
      await req.user.save();
    } else {
      console.log("you already following");
    }
  }
  res.redirect("/home");
};
