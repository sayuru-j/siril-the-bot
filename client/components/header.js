"use client";

import { FlaskConicalIcon, GhostIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://192.168.1.12:8000" ||
  "http://localhost:8000";

export default function Header() {
  const [togglePersonality, setTogglePersonality] = useState(false);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [personalityChangeStatus, setPersonalityChangeStatus] = useState("");

  async function updatePersonality() {
    try {
      const response = await fetch(`${apiUrl}/personality`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          personality,
        }),
      });

      if (response.ok) {
        setPersonalityChangeStatus(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPersonalityChangeStatus("");
      setTogglePersonality(!togglePersonality);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [personalityChangeStatus]);

  return (
    <header className="flex items-center sm:justify-between justify-center w-full px-4 bg-darkText sm:rounded-none rounded-b-3xl">
      <div className="flex gap-1 items-center justify-center relative">
        <button
          onClick={() => setTogglePersonality(!togglePersonality)}
          type="button"
        >
          <Image
            priority={1}
            className="w-16 antialiased"
            src="/logo.png"
            alt="siril-the-bot"
            width={100}
            height={100}
          />
        </button>
        <div
          className={`w-screen h-screen bg-cards items-center justify-center ${
            togglePersonality ? "flex" : "hidden"
          }`}
        >
          <div className="p-4 bg-lightText text-sm rounded-2xl text-darkText font-bold w-full max-w-sm mx-2">
            {personalityChangeStatus ? (
              <div>{personalityChangeStatus.message}</div>
            ) : (
              <div>
                <input
                  className="w-full bg-lightText placeholder:text-darkText py-2 !outline-none"
                  placeholder="Name of the personality?"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="!outline-none placeholder:text-darkText"
                  onInput={(e) => {
                    const content = e.target.textContent;
                    setPersonality(content);
                  }}
                  placeholder="Give a personality..."
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                />
              </div>
            )}

            <div className="p-2 flex items-center text-xs justify-end gap-2">
              <button
                type="button"
                className="bg-darkText p-2 text-cards rounded-2xl hover:scale-110 transition-all duration-200 ease-in-out"
                onClick={updatePersonality}
              >
                Done
              </button>
              <button
                type="button"
                className="bg-cards p-2 text-darkText rounded-2xl hover:scale-110 transition-all duration-200 ease-in-out"
                onClick={() => setTogglePersonality(!togglePersonality)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-3xl sm:hidden absolute bottom-0 right-8 text-lightText">
          <span className="animate-ping">.</span>
        </h1>
      </div>
      <div className="items-center justify-center gap-4 hidden">
        <button type="button">
          <GhostIcon className="text-cards opacity-50 hover:opacity-90 hover:cursor-pointer transition-all duration-300 ease-in-out" />
        </button>
        {/* <a href="https://badbytes.io" target="_blank">
          <FlaskConicalIcon className="w-5 text-white opacity-50 hover:opacity-90 hover:cursor-pointer transition-all duration-300 ease-in-out" />
        </a> */}
      </div>
    </header>
  );
}
