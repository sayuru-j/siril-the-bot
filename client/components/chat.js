"use client";

import { useTypingEffect } from "@/hooks/typing-effect";
import { BotIcon, DotIcon, Edit2Icon, SendHorizontalIcon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const apiUrl = "http://192.168.1.12:8000";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [prevMessage, setPrevMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [chatRes, setChatRes] = useState("");

  async function sendMessage() {
    try {
      setPrevMessage(message);
      setSent(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Error sending message");
      }

      const data = await response.json();
      setChatRes(data?.message);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  let reply = useTypingEffect(chatRes, 40);

  return (
    <div class="max-w-3xl mx-auto py-4 sm:px-0 px-4">
      <div className="flex flex-col gap-2 min-h-[85vh]">
        <div className="p-2 rounded-3xl relative">
          {prevMessage && sent && (
            <div>
              {prevMessage}
              <div className="absolute right-2 top-2">
                <Edit2Icon className="w-4" />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 border p-2 rounded-3xl overflow-y-auto">
          <div className="pt-2">
            <BotIcon />
          </div>
          <div className="p-2 rounded-3xl relative w-full">
            {reply ? (
              <Markdown
                className="flex flex-col gap-4 leading-relaxed"
                children={reply}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        className="rounded-xl"
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={docco}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            ) : (
              <div className="flex items-center space-x-1">
                <h2>Hearing you</h2>
                <h2 className="animate-bounce">👀</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bottom-0 max-w-3xl mx-auto py-2 sticky bg-white">
        <div className="flex items-center justify-center relative">
          <input
            className="w-full py-3 px-3 text-opacity-70 border rounded-full !outline-none"
            placeholder="Ask Something!"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSent(false);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            type="button"
            className="absolute right-4 bottom-4"
          >
            <SendHorizontalIcon
              className="-rotate-45 antialiased w-5 hover:cursor-pointer opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out"
              strokeWidth={1.6}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
