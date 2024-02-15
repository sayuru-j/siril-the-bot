import Conversation from "@/components/Conversation";
import { ChatService } from "@/services/API/ChatService";

export default async function Home() {
  const chatService = new ChatService("659a432eb3d1e2d9f0a3e4a5");
  const conversation = (await chatService.fetchConversation()) as Conversation;

  return (
    <main className="">
      <Conversation conversation={conversation} />
      <div className="absolute bottom-0 w-full">
        <div className="py-3 sticky bottom-0 max-w-2xl bg-background w-full mx-auto flex flex-col items-center justify-center">
          <input
            className="bg-background border w-full p-3 rounded-full !outline-none text-sm"
            type="text"
            id="textInput"
            placeholder="Type here"
          ></input>
          {/* <h2 className="">Siril-The-Bot</h2> */}
        </div>
      </div>
    </main>
  );
}
