const express = require("express");
const router = express.Router({ mergeParams: true });
const loginController = require("../controllers/login.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");

router
  .route("/login")
  .get(loginController.loginPage)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/insta/login",
    }),
    loginController.saveLogin
  );

router
  .route("/signup")
  .get(loginController.signupPage)
  .post(wrapAsync(loginController.saveSignup));

router.get("/logout", loginController.logout);

module.exports = router;
