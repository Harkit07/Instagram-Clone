const express = require("express");
const router = express.Router({ mergeParams: true });
const profileController = require("../controllers/profile.js");
const { isLoggedIn } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/:id/posts", isLoggedIn, profileController.profilePosts);
router.get("/:id/reels", isLoggedIn, profileController.profileReels);
router.get("/:id/saved", isLoggedIn, profileController.profileSaved);
router.get("/:id/tagged", isLoggedIn, profileController.profileTagged);
router
  .route("/:id/edit")
  .get(isLoggedIn, profileController.profileEdit)
  .post(
    isLoggedIn,
    upload.single("user[profilePic]"),
    profileController.saveEdit
  );

module.exports = router;
