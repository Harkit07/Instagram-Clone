const User = require("../models/user.js");
const Post = require("../models/user.js");

module.exports.loginPage = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.saveLogin = async (req, res) => {
  res.redirect("/home");
};

module.exports.signupPage = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.saveSignup = async (req, res) => {
  let { username, password, fullname, id } = req.body;
  let newUser = new User({ username, fullname, id });
  await User.register(newUser, password);
  res.redirect("/home");
  // let users = await User.register(newUser, password);
  // let user = req.user;
  // res.render("profile/posts", { user });
};

module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/insta/login");
  });
};
