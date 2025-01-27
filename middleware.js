module.exports.isLoggedIn = (req, res, next) => {
  res.locals.currUser = req.user;
  if (!req.isAuthenticated()) {
    // req.session.redirectUrl = req.originalUrl;
    // req.flash("error", "you must be logged in to create");
    return res.redirect("/insta/login");
  }
  next();
};
