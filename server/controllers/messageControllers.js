const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/User.js');
const Chat = require('../models/chatModel');
const otpGenerator = require('otp-generator');

const allMessages = asyncHandler(async (req, res) => {
  console.log('fetching admin messages');
  try {
    const messages = await Message.find()
      .sort({ updatedAt: -1 }) //1 for ascending and -1 for descending (decending willmean having the most recently updated at the top)
      .populate('user', '-password')
      .populate({
        path: 'content',
        populate: {
          path: 'sender',
          model: 'User', // the model from which the path is to be populated. In this cas "sender" is an id in the "User" model
          select: 'name photo email role', // to send everything except the user's password
        },
      });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getUserMessages = asyncHandler(async (req, res) => {
  try {
    console.log('fetching user messages');

    const messages = await Message.find({ user: req.user._id })
      .sort({ updatedAt: -1 }) //1 for ascending and -1 for descending (decending willmean having the most recently updated at the top)
      .populate('user', '-password')
      .populate({
        path: 'content',
        populate: {
          path: 'sender',
          model: 'User', // the model from which the path is to be populated. In this cas "sender" is an id in the "User" model
          select: 'name photo email role', // to send everything except the user's password
        },
      });

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getUserMessagesById1 = asyncHandler(async (req, res) => {
  const { messageId } = req.body;
  console.log('processing');

  console.log({ messageId: messageId });
  try {
    const messages = await Message.findById({
      _id: messageId,
      user: req.user._id,
    }).populate({
      path: 'content',
      populate: {
        path: 'sender',
        model: 'User', // the model from which the path is to be populated. In this cas "sender" is an id in the "User" model
        select: '-password', // to send everything except the user's password
      },
    });

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getUserMessagesById = asyncHandler(async (req, res) => {
  const { messageId } = req.body;
  try {
    const messages = await Message.findById({
      _id: messageId,
      user: req.user._id,
    })
      .populate('user', '-password')
      .populate({
        path: 'content',
        populate: {
          path: 'sender',
          model: 'User', // the model from which the path is to be populated. In this cas "sender" is an id in the "User" model
          select: 'name photo email role', // to send everything except the user's password
        },
      });

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//given the array

/**
 * 
 *{
    "__v": 1,
    "_id": "5252875356f64d6d28000001",
    "pages": [
      {
        "__v": 1,
        "_id": "5252875a56f64d6d28000002",
        "page": {
          "components": [
            "525287a01877a68528000001"
          ]
        }
      }
    ],
    "author": "Book Author",
    "title": "Book Title"
  }
 */

//One can populate "components" like this
// Project.find(query)
//   .populate({
//      path: 'pages',
//      populate: {
//        path: 'components',
//        model: 'Component'
//      }
//   })
//   .exec(function(err, docs) {});

//You can populate multiple nested documents like this.
// Project.find(query)
// .populate({
//   path: 'pages',
//   populate: [{
//    path: 'components',
//    model: 'Component'
//   },{
//     path: 'AnotherRef',
//     model: 'AnotherRef',
//     select: 'firstname lastname'
//   }]
// })
// .exec(function(err, docs) {});

// Generate OTP
const generateOrderId = async () => {
  // 8 digits AlphaNumeric OPT
  const newOTP = otpGenerator.generate(8, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: true,
    specialChars: false,
  });

  console.log({ OTP: newOTP });

  return newOTP;
};
const createTIcket = asyncHandler(async (req, res) => {
  const { txId, subject, message, service, subService, addedPhotos } = req.body;

  const user = await User.findById(req.user._id); // get userId from "protect middleware"

  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
  }

  const userId = user?._id;
  const name = user?.name;
  const email = user?.email;
  const newTicketNo = await generateOrderId();

  const timeNow = Date.now();

  try {
    const newTicket = await Message.create({
      user: userId,
      name,
      email,
      orderNo: txId,
      txId,
      ticketNumber: newTicketNo,
      subject,
      service,
      subService,
      content: [
        {
          message: message,
          sender: userId,
          latestMessage: message,
          role: user?.role,
          created: new Date(timeNow),
          readBy: [user?._id],
          photos: addedPhotos,
        },
      ],
      readBy: userId, // the user who sent must have read the message before sending
      updated: new Date(timeNow),
    });

    console.log({ newTicket: newTicket });

    res.status(200).json(newTicket);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage2 = asyncHandler(async (req, res) => {
  const { messageId, message } = req.body;

  console.log({ content: req.body });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
  }

  // check if message exists
  const messageExists = await Message.findById(messageId);

  if (!messageExists) {
    res.status(400);
    throw new Error('Message not found, please login');
  }

  //Check if user is authorized: only admin and the right user is authorized
  const authorizedUser = messageExists?.user;

  if (user?._id != authorizedUser || user?.role != 'Admin') {
    res.status(400);
    throw new Error('Not Authorised');
  }

  const newContent = {
    message: message,
    sender: user?._id,
    latestMessage: message,
    role: user?.role,
  };

  const added = await Message.findByIdAndUpdate(
    messageId,
    {
      $push: { content: newContent },
    },
    {
      new: true,
    }
  ).populate('user', '-password');

  if (!added) {
    res.status(404);
    throw new Error('Chat Not Found');
  } else {
    res.json(added);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { messageId, message, addedPhotos } = req.body;
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
  }

  // check if message exists
  const messageExists = await Message.findById(messageId);

  if (!messageExists) {
    res.status(400);
    throw new Error('Message not found, please login');
  }
  const authorizedUser = messageExists?.user;
  // }

  if (
    user?._id.toString() === authorizedUser.toString() ||
    user?.role === 'Admin'
  ) {
    const timeNow = Date.now();

    console.log({ timeNow });

    const newContent = {
      message: message,
      sender: user?._id,
      latestMessage: message,
      role: user?.role,
      created: new Date(timeNow),
      readBy: [user?._id],
      photos: addedPhotos,
    };

    console.log({ newContent: newContent });

    const latesUpdate = new Date(timeNow);

    messageExists?.content.push(newContent);
    messageExists.updated = latesUpdate || messageExists?.updated;

    const updatedMessage = await messageExists.save();
    if (updatedMessage) {
      console.log({ updatedMessage: updatedMessage });
      res.status(200).json(updatedMessage);
    }
  } else {
    res.status(400);
    throw new Error('Not Authorised');
  }
});

const updateMessageStatus = asyncHandler(async (req, res) => {
  const { messageId, status } = req.body;
  console.log({ status: status });

  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
  }

  // check if message exists
  const messageExists = await Message.findById(messageId);

  if (!messageExists) {
    res.status(400);
    throw new Error('Message not found, please login');
  }

  messageExists.status = status || messageExists.status;

  const response = await messageExists.save();

  if (response) {
    res.status(200).json(response);
  }
});

const updateReadBy = asyncHandler(async (req, res) => {
  const { messageId, contentId } = req.body;

  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
  }

  // check if message exists
  const messageExists = await Message.findById(messageId);

  const content = messageExists?.content;

  content?.map((c) => {
    if (c?._id.toString() === contentId.toString()) {
      c.readBy.map((r) => {
        if (r.toString() === user?._id.toString()) {
          return;
        } else {
          r.push(user?._id);
        }
      });
    }
  });

  const response = await messageExists.save();

  if (response) {
    res.status(200).json(response);
  }
});

module.exports = {
  allMessages,
  sendMessage,
  getUserMessages,
  getUserMessagesById,
  createTIcket,
  updateMessageStatus,
};
