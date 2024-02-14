const openai = require("openai");
const OpenAIConfigService = require("./openaiConfigService");
const ChatService = require("./chatService");

class OpenAiChatService {
  static async ReplyToMessage(messageContent, userId) {
    const { apiKey } = await OpenAIConfigService.GetActiveKey();

    const client = new openai.OpenAI({
      apiKey,
    });

    const chatHistory = await ChatService.getConversationByUser(userId);

    try {
      const botResponses = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You're Siril. A bot who specializes in programming! Reply in short messages. A brief history of this conversation: is provided here. History : ${chatHistory?.messages.slice(
              -50
            )}`,
          },
          {
            role: "user",
            content: messageContent,
          },
        ],
      });

      const reply = {
        id: "65aec91ee80ab8db6171adfe",
        role: botResponses.choices[0]?.message?.role,
        content: botResponses.choices[0]?.message?.content,
      };

      return reply;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = OpenAiChatService;
