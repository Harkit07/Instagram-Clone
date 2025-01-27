const User = require("../models/user.js");

module.exports.profilePosts = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");
  res.render("profile/posts.ejs", { user });
};

module.exports.profileReels = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");
  res.render("profile/reels.ejs", { user });
};

module.exports.profileSaved = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");
  res.render("profile/saved.ejs", { user });
};

module.exports.profileTagged = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id)
    .populate("posts")
    .populate("followers")
    .populate("following");
  res.render("profile/tagged.ejs", { user });
};

module.exports.profileEdit = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  res.render("profile/edit", { user });
};

module.exports.saveEdit = async (req, res) => {
  let { id } = req.params;
  let url = req.file.path;
  let filename = req.file.filename;
  let savedUser = await User.findByIdAndUpdate(id, { ...req.body.user });
  savedUser.profilePic = { url, filename };
  await savedUser.save();
  res.redirect(`/profile/${id}/posts`);
};
