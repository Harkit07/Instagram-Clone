const express = require("express");
const router = express.Router({ mergeParams: true });
const messagesController = require("../controllers/messages.js");
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/", isLoggedIn, messagesController.homeMessages);
router
  .route("/:id/messages")
  .get(isLoggedIn, messagesController.showMessages)
  .post(isLoggedIn, messagesController.sendMessages);

module.exports = router;
