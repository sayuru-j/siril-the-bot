const ChatError = require("../exception/chatException");
const ChatService = require("../services/chatService");
const OpenAiChatService = require("../services/openaiChatService");

class ChatController {
  static async getConversation(req, res) {
    try {
      const { userId } = req.query;

      if (!userId) throw new ChatError.NullUserIdError();

      const conversation = await ChatService.getConversationByUser(userId);

      return res.send({
        resource: "/chat/conversation",
        conversation,
      });
    } catch (error) {
      console.error(error);

      const statusCode = error instanceof ChatError.NullUserIdError ? 400 : 500;
      res.status(statusCode).json({
        error: error.message,
      });
    }
  }
  static async addMessage(req, res) {
    try {
      const { conversationId, senderId } = req.query;
      const { messageContent } = req.body;

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
