const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    require: true,
  },
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
