const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const conversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [messageSchema],
  participants: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  lastActivity: {
    type: Date,
    default: Date.now(),
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
