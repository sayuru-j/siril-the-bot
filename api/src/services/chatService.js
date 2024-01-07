const Conversation = require("../models/Conversation");

class ChatService {
  static async getConversationByUser(userId) {
    return await Conversation.findOne({
      user: userId,
    }).populate("participants", "username");
  }

  static async addMessage(conversationId, senderId, messageContent) {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      throw new Error("Couldn't find conversation");
    }

    const newMessage = {
      content: messageContent,
      sender: senderId,
    };

    conversation.messages.push(newMessage);
    conversation.lastActivity = Date.now();

    await conversation.save();

    return newMessage;
  }

  static async addNewConversationByUser(senderId, messageContent) {
    const conversationExists = await Conversation.findOne({
      user: senderId,
    });

    if (conversationExists) {
      const conversationExistsMessage = {
        message: "Conversation already exists",
        conversationId: conversationExists._id,
      };

      return conversationExistsMessage;
    }

    const newConvo = await Conversation.create({
      user: senderId,
      messages: [
        {
          sender: senderId,
          content: messageContent,
        },
      ],
      participants: [senderId],
    });

    return newConvo;
  }
}

module.exports = ChatService;
