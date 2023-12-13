import Chat from "@/components/chat";
import Header from "@/components/header";

export default function Home() {
  return (
    <main
      className="h-[93vh]"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Header />
      <Chat />
    </main>
  );
}
