import { Conversation } from "@/utils/Types";
import Image from "next/image";

interface ConversationProps {
  conversation: Conversation;
}

const Conversation = ({ conversation }: ConversationProps) => {
  const userId = "659a432eb3d1e2d9f0a3e4a5";
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto h-screen overflow-y-scroll pt-5 pb-20 px-5">
      {conversation.messages.map((message) => (
        <div
          className={`${
            message.sender === userId
              ? "bg-accent-3/80 rounded-l-2xl rounded-t-2xl"
              : "bg-secondary-accent/80 rounded-r-2xl rounded-t-2xl"
          }
          p-3 border border-black border-dashed shadow-sm
          `}
          key={message._id}
        >
          <div className="flex justify-between">
            {message.sender !== userId && (
              <Image
                className="rounded-full object-cover w-8 h-8 shadow-[-2px_4px_0px_rgba(0,0,0,1)]"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
                alt=""
                width={50}
                height={50}
              />
            )}
            <h2 className="text-sm font-mono text-ellipsis px-3">
              {message.content}
            </h2>
            {message.sender === userId && (
              <Image
                className="rounded-full object-cover w-8 h-8 shadow-[2px_4px_0px_rgba(0,0,0,1)]"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg"
                alt=""
                width={50}
                height={50}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversation;
