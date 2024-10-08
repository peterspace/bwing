const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/User.js");
const otpGenerator = require("otp-generator");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  // if (users.length < 2) {
  //   return res
  //     .status(400)
  //     .send('More than 2 users are required to form a group chat');
  // }

  if (users.length < 1) {
    return res
      .status(400)
      .send("More than 1 users is required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const createTIcketChat1 = asyncHandler(async (req, res) => {
  const { userId, txId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: `TX: ${txId}`,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const createTIcketChatOriginal = asyncHandler(async (req, res) => {
  const { userId, txId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  const newUser = User.findById(userId);

  // const users = [req.user._id, userId];
  const users = [req.user, newUser];

  // if (users.length < 2) {
  //   return res
  //     .status(400)
  //     .send('More than 2 users are required to form a group chat');
  // }

  if (users.length < 1) {
    return res
      .status(400)
      .send("More than 1 users are required to form a group chat");
  }

  // users.push(req.user);

  try {
    const groupChat = await Chat.create({
      // chatName: req.body.name,
      // users: users,
      chatName: `TX: ${txId}`,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

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
const createTIcketChat = asyncHandler(async (req, res) => {
  const { txId, subject, message, service, subService } = req.body;

  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }

  const userId = user?._id;
  const name = user?.name;
  const email = user?.email;
  // const adminId = '65942da95271e14e8af3a6ee';

  const adminUser = user.findOne({ email: "admin@gmail.com" });

  const newTicketNo = await generateOrderId();
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // const users = [req.user._id, userId];
  // const users = [req.user, newUser];
  const users = [adminUser, user];

  // if (users.length < 2) {
  //   return res
  //     .status(400)
  //     .send('More than 2 users are required to form a group chat');
  // }

  if (users.length < 1) {
    return res
      .status(400)
      .send("More than 1 users are required to form a group chat");
  }

  // users.push(req.user);

  try {
    // const groupChat = await Chat.create({
    //   chatName: `TX: ${txId}`,
    //   users,
    //   isGroupChat: true,
    //   groupAdmin: req.user,
    // });

    const groupChat = await Chat.create({
      user: userId,
      name,
      email,
      orderNo: txId,
      txId,
      ticketNo: newTicketNo,
      subject,
      message,
      service,
      subService,
      users,
      chatName: subject,
      isGroupChat: true,
      // groupAdmin: adminUser,
      groupAdmin: adminUser?._id,

    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// const createGroupChatByTransaction = asyncHandler(async (req, res) => {
//   const { userId, adminId, txId } = req.body;
//   if (!userId || !adminId || !txId) {
//     return res.status(400).send({ message: 'Please Fill all the feilds' });
//   }

//   const adminUser = User.findById({ _id: adminId });
//   const clientUser = User.findById({ _id: userId });

//   // const adminUser = User.findById(adminId);
//   // const clientUser = User.findById(userId);

//   console.log({adminUser: JSON.parse(adminUser)})
//   console.log({clientUser: JSON.parse(clientUser)})

//   // const user = await User.findById(userId);

//   // var users = JSON.parse(req.body.users);
//   const users = [adminUser, clientUser];
//   console.log({ users: users });

//   if (users.length < 1) {
//     return res
//       .status(400)
//       .send('More than 1 users is required to form a group chat');
//   }

//   try {
//     const groupChat = await Chat.create({
//       chatName: `TX: ${txId}`,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: adminUser,
//     });

//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//       .populate('users', '-password')
//       .populate('groupAdmin', '-password');
//     console.log({ fullGroupChat: fullGroupChat });
//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// const createGroupChatByTransaction = asyncHandler(async (req, res) => {
//   const { userId, adminId, txId } = req.body;
//   if (!userId || !adminId || !txId) {
//     return res.status(400).send({ message: 'Please Fill all the feilds' });
//   }

//   // const adminUser = User.findById({ _id: adminId });
//   const adminUser = User.findById(adminId);

//   if (!adminUser) {
//     res.status(400);
//     throw new Error('Admin not found');
//   }
//   // const clientUser = User.findById({ _id: userId });
//   const clientUser = User.findById(userId);

//   if (!clientUser) {
//     res.status(400);
//     throw new Error('User not found');
//   }

//   // const adminUser = User.findById(adminId);
//   // const clientUser = User.findById(userId);

//   console.log({ adminUser: JSON.parse(adminUser) });
//   console.log({ clientUser: JSON.parse(clientUser) });

//   // const user = await User.findById(userId);

//   // var users = JSON.parse(req.body.users);
//   const users = [adminId, userId];
//   console.log({ users: users });

//   if (users.length < 1) {
//     return res
//       .status(400)
//       .send('More than 1 users is required to form a group chat');
//   }

//   try {
//     const groupChat = await Chat.create({
//       chatName: `TX: ${txId}`,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: adminUser,
//     });

//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//       .populate('users', '-password')
//       .populate('groupAdmin', '-password');
//     console.log({ fullGroupChat: fullGroupChat });
//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// @description     Create New Group Chat
// @route           POST /api/chat/group
// @access          Protected
const createGroupChatByTransaction = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  console.log({ users: users });

  // if (users.length < 2) {
  //   return res
  //     .status(400)
  //     .send('More than 2 users are required to form a group chat');
  // }

  if (users.length < 1) {
    return res
      .status(400)
      .send("More than 1 users is required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: [users[0]],
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  createTIcketChat,
  createGroupChatByTransaction,
};
