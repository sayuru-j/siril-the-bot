"use client";

import { useTypingEffect } from "@/hooks/typing-effect";
import {
  BotIcon,
  DotIcon,
  Loader2Icon,
  SendHorizontalIcon,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";

const apiUrl = "http://192.168.1.12:8000";

export default function Home() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [chatRes, setChatRes] = useState("");

  async function sendMessage() {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  let reply = useTypingEffect(chatRes, 40);

  return (
    <main className="h-[85vh] md:px-0 px-4 relative">
      <div className="flex space-x-2 w-full items-center justify-center py-4 border-b-[1px] z-50">
        <BotIcon />
        <h1 className="font-medium">Bot-Siril</h1>
      </div>
      <div className="max-w-2xl mx-auto py-4 flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-end text-overflow: ellipsis">
            <div className="bg-black p-2 text-white rounded-2xl">
              {message && sent ? (
                message
              ) : (
                <div className="flex">
                  <DotIcon className="animate-pulse" />
                  <DotIcon className="animate-pulse" />
                  <DotIcon />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="bg-corel p-2 text-white rounded-2xl transition-all duration-300 ease-in-out">
              {reply ? (
                reply
              ) : (
                <div className="flex items-center space-x-1">
                  <h2>Hearing you</h2>
                  <h2 className="animate-bounce">👀</h2>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <input
            className="w-full pl-2 pr-0 py-1 text-opacity-70 bg-slate-50 rounded-full !outline-none hover:shadow-[0px_4px_0px_rgba(0,0,0,1)]"
            placeholder="Ask Something!"
            onChange={(e) => {
              setMessage(e.target.value);
              setSent(false);
            }}
          />
          <button
            onClick={sendMessage}
            type="button"
            className="absolute -right-1 bg-corel p-3 rounded-full hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:cursor-pointer hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <SendHorizontalIcon className="text-black" />
          </button>
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <SettingsIcon className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer" />
      </div>
    </main>
  );
}
