const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    admin: {
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
    service: String, // BUYCRYPTO, SELLCRYPTO,
    subService: String,
    status: {
      type: String,
      default: 'Pending', //'Pending', 'Active', 'Resolved', 'Closed'
    },
    content: [
      {
        message: { type: String, trim: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        latestMessage: { type: String, trim: true },
        role: {
          type: String,
          default: 'User', // "User" and "Admin"
          // default:
        },
        created: Date,
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        photos: [String],
        files: [{ type: String, default: '' }],
      },
    ], // array of message
    updated: Date,

    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
