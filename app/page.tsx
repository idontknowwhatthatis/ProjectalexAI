"use client"; // Important: marks this as a client component

import { useState } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import DevPanel from "@/components/DevPanel";

export default function Page() {
  const [aiParams, setAiParams] = useState({ temperature: 1, style: "default", maxTokens: 150 });
  const [debug, setDebug] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  // Sends message to AI API
  const handleSendMessage = async (msg: string) => {
    setMessages(prev => [...prev, { sender: "User", text: msg }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: msg,
          temperature: aiParams.temperature,
          style: aiParams.style,
          maxTokens: aiParams.maxTokens,
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: `AI (${aiParams.style}, temp=${aiParams.temperature})`, text: data.text }]);
      if (debug) console.log("AI Response:", data.text);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { sender: "AI", text: "[Error generating response]" }]);
    }
  };

  const handleUpdateParams = (params: { temperature: number; style: string; maxTokens: number }) => {
    setAiParams(params);
    if (debug) console.log("AI Parameters updated:", params);
  };

  const handleToggleDebug = (d: boolean) => {
    setDebug(d);
    console.log("Debug logging:", d ? "enabled" : "disabled");
  };

  const handleInjectMessage = (msg: string) => {
    setMessages(prev => [...prev, { sender: "Injected", text: msg }]);
    if (debug) console.log("Injected message:", msg);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-900 text-white">
      <Header />
      <section className="py-6 container mx-auto">
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </section>

      <footer className="container mx-auto py-10 text-center text-xs text-slate-500">
        Built with ❤️ by Alex.
      </footer>

      {/* Secret DevPanel shortcut */}
      <DevPanel
        onUpdateParams={handleUpdateParams}
        onToggleDebug={handleToggleDebug}
        onInjectMessage={handleInjectMessage}
      />
    </main>
  );
}
