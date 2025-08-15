"use client"; // Required because we use useState and client components

import { useState } from "react";
import Header from "@/components/Header";
import Chat, { ChatMessage } from "@/components/Chat";
import DevPanel from "@/components/DevPanel";

export default function Page() {
  const [aiParams, setAiParams] = useState({ temperature: 1, style: "default", maxTokens: 150 });
  const [debug, setDebug] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleUpdateParams = (params: { temperature: number; style: string; maxTokens: number }) => {
    setAiParams(params);
    if (debug) console.log("AI Parameters updated:", params);
  };

  const handleToggleDebug = (d: boolean) => {
    setDebug(d);
    console.log("Debug logging:", d ? "enabled" : "disabled");
  };

  const handleInjectMessage = (msg: string) => {
    setMessages(prev => [...prev, { text: `[Injected] ${msg}`, sender: "user" }]);
    if (debug) console.log("Injected message:", msg);
  };

  const handleSendMessage = async (msg: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: msg, sender: "user" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, aiParams }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: "ai" }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "[Error generating response]", sender: "ai" }]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-900 text-white p-4">
      <Header />

      <section className="py-6 container-max">
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </section>

      <DevPanel
        onUpdateParams={handleUpdateParams}
        onToggleDebug={handleToggleDebug}
        onInjectMessage={handleInjectMessage}
      />

      <footer className="container-max py-10 text-center text-xs text-slate-500">
        Built with ❤️ by Alex.
      </footer>
    </main>
  );
}
