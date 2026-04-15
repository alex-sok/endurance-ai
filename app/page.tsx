import { ChatShell } from "@/components/chat/ChatShell";

export default function Home() {
  return (
    <main className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden px-4 sm:px-6">
        <ChatShell />
      </div>
    </main>
  );
}
