"use client";

import { useTypingEffect } from "@/hooks/typing-effect";
import { FlaskConicalIcon, GhostIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://192.168.1.12:8000" ||
  "http://localhost:8000";

export default function Header() {
  const [togglePersonality, setTogglePersonality] = useState(false);
  const [personalities, setPersonalities] = useState([]);
  const [personalityChanged, setPersonalityChanged] = useState("");

  async function getPersonalities() {
    try {
      const response = await fetch(`${apiUrl}/personalities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Couldn't get personalities");
      }

      const data = await response.json();
      setPersonalities(Object.values(data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPersonalities();

    if (personalityChanged !== "") {
      const timeoutId = setTimeout(resetPersonalityChanged, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [togglePersonality, personalityChanged]);

  async function selectPersonality(personality) {
    try {
      const response = await fetch(`${apiUrl}/personality`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: personality,
        }),
      });

      if (!response.ok) {
        console.error("Couldn't select a personality");
      }

      const data = await response.json();
      setPersonalityChanged(data.message);
      setTogglePersonality(!togglePersonality);
    } catch (error) {
      console.error(error);
    }
  }

  const resetPersonalityChanged = () => {
    setPersonalityChanged("");
  };

  return (
    <div>
      <header
        className={`flex items-center justify-center w-full px-4 sm:rounded-none rounded-b-3xl ${
          togglePersonality ? "bg-cards" : "bg-darkText"
        }`}
      >
        <div className="flex gap-1 items-center justify-center relative">
          <button
            onClick={() => setTogglePersonality(!togglePersonality)}
            type="button"
          >
            <Image
              priority={1}
              className={`w-16 antialiased ${
                togglePersonality && "bg-darkText rounded-full"
              }`}
              src="/logo.png"
              alt="siril-the-bot"
              width={100}
              height={100}
            />
          </button>

          <h1 className="font-bold text-3xl absolute bottom-0 right-[33px] text-lightText">
            <span className="animate-ping text-sm">.</span>
          </h1>
        </div>

        <div
          className={`h-screen w-screen rounded-b-2xl ${
            togglePersonality ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col w-full items-center justify-center gap-4">
            <h1 className="text-darkText text-lg font-bold uppercase">
              Select a personality:
            </h1>
            <div className="flex sm:flex-row flex-col gap-4">
              {personalities.map((persona) => {
                return (
                  <button
                    className="bg-darkText p-2 rounded-xl text-cards font-medium hover:scale-110 transition-all duration-200 ease-in-out"
                    key={persona.id}
                    onClick={() => selectPersonality(persona.id)}
                  >
                    {persona.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      {personalityChanged && (
        <h2 className="text-darkText font-bold text-center text-sm animate-pulse">
          {personalityChanged}
        </h2>
      )}
    </div>
  );
}
