const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.get("/", ChatController.getConversation);
router.post("/add-message", ChatController.addMessage);

module.exports = router;
