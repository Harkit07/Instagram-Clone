const express = require("express");
const router = express.Router({ mergeParams: true });
const homeController = require("../controllers/home.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/", isLoggedIn, wrapAsync(homeController.homePage));

router
  .route("/posts/new")
  .get(isLoggedIn, homeController.postPage)
  .post(
    isLoggedIn,
    upload.single("post[file]"),
    wrapAsync(homeController.uploadPost)
  );

router.get("/post/more", isLoggedIn, wrapAsync(homeController.pageInfo));

router
  .route("/:id/comment")
  .get(isLoggedIn, wrapAsync(homeController.commentPage))
  .post(isLoggedIn, wrapAsync(homeController.uploadComment));

router.get("/:id/follow", isLoggedIn, wrapAsync(homeController.followReq));

module.exports = router;
