const ChatService = require("../services/chatService");

class ChatController {
  static async getConversation(req, res) {
    try {
      const userId = req.params.userId;
      const conversation = await ChatService.getConversationByUser(userId);

      if (!conversation) {
        return res.status(404).json({
          error: "Conversation not found.",
        });
      }

      return res.send(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  static async addMessage(req, res) {
    try {
      const { conversationId, messageContent, senderId } = req.body;

      if (!conversationId) {
        const newChat = await ChatService.addNewConversationByUser(
          senderId,
          messageContent
        );

        return res.status(200).send(newChat);
      }

      const newMessage = await ChatService.addMessage(
        conversationId,
        senderId,
        messageContent
      );

      return res.status(200).json(newMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

module.exports = ChatController;
