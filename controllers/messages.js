const User = require("../models/user.js");
const Message = require("../models/message.js");

module.exports.homeMessages = async (req, res) => {
  let ownerId = req.user._id;
  let messages = await Message.find({});
  let owner = await User.findById(ownerId).populate("following");
  res.render("pages/messageHome", { owner, messages });
};

module.exports.showMessages = async (req, res) => {
  let ownerId = req.user._id;
  let { id } = req.params;
  let messages = await Message.find({});
  let owner = await User.findById(ownerId).populate("following");
  let user = await User.findById(id);
  res.render("pages/messages", { owner, user, messages });
};

module.exports.sendMessages = async (req, res) => {
  let ownerId = req.user._id;
  let { id } = req.params;
  let { message } = req.body;
  let newMessage = new Message({ content: message });
  newMessage.sender_id = ownerId;
  newMessage.receiver_id = id;
  await newMessage.save();
  res.redirect(`/message/${id}/messages`);
};
