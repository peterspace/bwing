const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    //=============================={Updates}================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderNo: String,
    txId: String,
    ticketNumber: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    service: String, // BUYCRYPTO, SELLCRYPTO,
    subService: String,
    status: {
      type: String,
      default: 'Pending', // 'Submitted', 'Pending', 'Active', 'Resolved', 'Closed'
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
