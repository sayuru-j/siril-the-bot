import { FlaskConicalIcon } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center sm:justify-between justify-center w-full px-4 py-4 border-b-[1.5px]">
      <div className="flex gap-1 items-center justify-center">
        <Image
          className="w-20 antialiased"
          src="/logo.png"
          alt="siril-the-bot"
          width={100}
          height={100}
        />
        <h1 className="font-black text-xl hidden">SIRIL</h1>
      </div>
      <div className="sm:flex items-center justify-center hidden">
        <FlaskConicalIcon className="opacity-50 hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out" />
      </div>
    </header>
  );
}
