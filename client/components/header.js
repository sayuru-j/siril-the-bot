import { FlaskConicalIcon } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center sm:justify-between justify-center w-full px-4 bg-darkText sm:rounded-none rounded-b-3xl">
      <div className="flex gap-1 items-center justify-center relative">
        <Image
          priority={1}
          className="w-20 antialiased"
          src="/logo.png"
          alt="siril-the-bot"
          width={100}
          height={100}
        />
        <h1 className="font-bold text-3xl sm:hidden absolute bottom-0 right-10 text-lightText">
          <span className="animate-ping">.</span>
        </h1>
      </div>
      <div className="sm:flex items-center justify-center hidden">
        <a href="https://badbytes.io" target="_blank">
          <FlaskConicalIcon className="w-5 text-white opacity-50 hover:opacity-90 hover:cursor-pointer transition-all duration-300 ease-in-out" />
        </a>
      </div>
    </header>
  );
}
