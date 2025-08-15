"use client"; // Mark as client component for useState, hooks, etc.

import { useState } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import DevPanel from "@/components/DevPanel";

// Mock AI call function (replace with your real API)
const callAI = async (
  userMessage: string,
  aiParams: { temperature: number; style: string; maxTokens: number }
) => {
  // Simulate AI response for testing
  return `AI [style=${aiParams.style}, temp=${aiParams.temperature}, maxTokens=${aiParams.maxTokens}]: ${userMessage
    .split("")
    .reverse()
    .join("")}`;
};

export default function Page() {
  const [aiParams, setAiParams] = useState({ temperature: 1, style: "default", maxTokens: 150 });
  const [debug, setDebug] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  // DevPanel handlers
  const handleUpdateParams = (params: { temperature: number; style: string; maxTokens: number }) => {
    setAiParams(params);
    if (debug) console.log("AI Parameters updated:", params);
  };

  const handleToggleDebug = (d: boolean) => {
    setDebug(d);
    console.log("Debug logging:", d ? "enabled" : "disabled");
  };

  const handleInjectMessage = (msg: string) => {
    setMessages(prev => [...prev, `[Injected] ${msg}`]);
    if (debug) console.log("Injected message:", msg);
  };

  // When user sends a message
  const handleSendMessage = async (msg: string) => {
    setMessages(prev => [...prev, msg]);
    if (debug) console.log("User message:", msg);

    const aiResponse = await callAI(msg, aiParams);
    setMessages(prev => [...prev, aiResponse]);
    if (debug) console.log("AI response:", aiResponse);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-800 text-white">
      <Header />

      <section className="container-max py-6 flex flex-col gap-4">
        {/* Secret Dev Panel */}
        <DevPanel
          onUpdateParams={handleUpdateParams}
          onToggleDebug={handleToggleDebug}
          onInjectMessage={handleInjectMessage}
        />

        {/* Chat Messages */}
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </section>

      <footer className="container-max py-10 text-center text-xs text-slate-500">
        Built with ❤️ by Alex.
      </footer>
    </main>
  );
}
