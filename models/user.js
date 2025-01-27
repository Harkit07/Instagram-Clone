const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePic: {
    url: String,
    filename: String,
  },
  gender: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  story: {
    url: String,
    filename: String,
  },
  saved: String,
  tagged: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
