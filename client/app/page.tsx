import Conversation from "@/components/Conversation";
import { ChatService } from "@/services/API/ChatService";

export default async function Home() {
  const chatService = new ChatService("659a432eb3d1e2d9f0a3e4a5");
  const conversation = (await chatService.fetchConversation()) as Conversation;

  return (
    <main>
      <Conversation conversation={conversation} />
    </main>
  );
}
