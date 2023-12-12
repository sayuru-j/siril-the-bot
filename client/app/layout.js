import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Siril The Bot",
  description: "Created by Sayuru J",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
