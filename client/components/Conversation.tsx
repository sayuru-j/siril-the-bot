import { Conversation } from "@/utils/Types";
import Image from "next/image";

interface ConversationProps {
  conversation: Conversation;
}

const Conversation = ({ conversation }: ConversationProps) => {
  const userId = "659a432eb3d1e2d9f0a3e4a5";
  return (
    <div className="m-5 flex flex-col gap-4 max-w-2xl mx-auto">
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
                className="rounded-full object-cover w-10 h-10 shadow-[-2px_4px_0px_rgba(0,0,0,1)]"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
                alt=""
                width={50}
                height={50}
              />
            )}
            <h2 className="text-sm text-ellipsis px-4">{message.content}</h2>
            {message.sender === userId && (
              <Image
                className="rounded-full object-cover w-10 h-10 shadow-[2px_4px_0px_rgba(0,0,0,1)]"
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
