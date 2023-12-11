"use client";

import { useTypingEffect } from "@/hooks/typing-effect";
import {
  BotIcon,
  CopyIcon,
  Edit2Icon,
  SendHorizontalIcon,
  Volume1Icon,
  VolumeXIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const apiUrl = "http://192.168.1.12:8000";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [prevMessage, setPrevMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isTextToSpeechAvailable, setIsTextToSpeechAvailable] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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

  async function copyToClipboard() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText("Test");
        console.log("Text copied to clipboard!");
      } else {
        console.log("Clipboard API not available in this environment.");
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  const audioRef = useRef();

  async function playTextToSpeech() {
    if (isTextToSpeechAvailable) {
      try {
        const response = await fetch(`${apiUrl}/text-to-speech`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: chatRes,
          }),
        });

        // response = { ok: true };

        if (response.ok) {
          // Set the audio source
          audioRef.current.src = "/audio/speech.mp3";

          // Play the audio
          await audioRef.current.play();
        } else {
          throw new Error("No audio to play!");
        }
      } catch (error) {
        console.log("Error playing text to speech");
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto pt-2 sm:px-0 px-4">
      <div className="flex flex-col gap-2 min-h-[85vh]">
        <div className="p-2 rounded-3xl relative">
          {prevMessage && sent && (
            <div>
              {prevMessage}
              <button type="button" className="absolute right-2 top-2">
                <Edit2Icon className="w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out" />
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2 border p-5 rounded-3xl overflow-y-auto">
          <div className="">
            <BotIcon className="w-6 h-6" />
          </div>
          <div className="rounded-3xl relative w-full">
            {reply ? (
              <div className="relative">
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
                <div className="absolute bottom-0 right-0 flex items-center justify-between gap-2">
                  {isTextToSpeechAvailable ? (
                    <button onClick={playTextToSpeech} type="button">
                      <audio ref={audioRef} />
                      <Volume1Icon className="w-5 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsTextToSpeechAvailable(true)}
                    >
                      <VolumeXIcon className="w-5 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out" />
                    </button>
                  )}
                  <button onClick={copyToClipboard} type="button">
                    <CopyIcon className="w-4 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <h2>Hearing you</h2>
                <h2 className="animate-bounce">👀</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-50 pb-2 pt-6 max-w-3xl mx-auto bg-white flex flex-col justify-center items-center rounded-t-3xl">
        <div className="flex w-full items-center justify-center relative break-words hover:break-words">
          <div className="w-full break-words hover:break-words">
            {/* Make words break when it reaches the max width */}
            <input
              type="text"
              className="w-full py-3 px-3 text-opacity-70 border rounded-3xl !outline-none focus:outline-none"
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
          </div>
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
        <div className="pt-2">
          <h1 className="text-xs font-thin">
            Generated by{" "}
            <a
              target="_blank"
              href="https://openai.com/"
              className="font-semibold"
            >
              OpenAI
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}
