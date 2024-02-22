const express = require("express");
const {
  allMessages,
  sendMessage,
  getUserMessages,
  getUserMessagesById,
  createTIcket,
  updateMessageStatus,
} = require("../controllers/messageControllers");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, isAdmin, allMessages); // admin only

router.patch("/", protect, sendMessage);
router.get("/getUserMessages", protect, getUserMessages);

router.post("/getUserMessagesById", protect, getUserMessagesById);

router.post("/createTIcket", protect, createTIcket);
// router.post("/createTIcket", createTIcket);


router.patch("/updateMessageStatus", protect, isAdmin, updateMessageStatus); // admin only

module.exports = router;
