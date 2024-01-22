const ChatService = require("../services/chatService");
const OpenAiChatService = require("../services/openaiChatService");

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

        const result = await OpenAiChatService.ReplyToMessage(messageContent);

        await ChatService.addMessage(newChat.id, result?.id, result?.content);

        const response = {
          conversationId: newChat.id,
          message: messageContent,
          reply: result?.content,
        };

        return res.status(200).send(response);
      }

      await ChatService.addMessage(conversationId, senderId, messageContent);

      const result = await OpenAiChatService.ReplyToMessage(
        messageContent,
        senderId
      );

      await ChatService.addMessage(conversationId, result?.id, result?.content);

      const response = {
        conversationId,
        message: messageContent,
        reply: result?.content,
      };

      res.send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = ChatController;
