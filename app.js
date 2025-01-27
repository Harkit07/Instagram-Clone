require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const homeRouter = require("./routes/home.js");
const loginRouter = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");
const messageRouter = require("./routes/messages.js");

app.use("/insta", loginRouter);
app.use("/home", homeRouter);
app.use("/profile", profileRouter);
app.use("/message", messageRouter);

// app.get("/test", async (req, res) => {
//   let followers = await User.updateMany({}, { $set: { followers: [] } });
//   let following = await User.updateMany({}, { $set: { following: [] } });
//   console.log(followers, following);
//   res.send("success");
// });

app.listen(8080, () => {
  console.log("server listing on port 8080");
});
