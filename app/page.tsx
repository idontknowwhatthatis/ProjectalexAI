"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import DevPanel from "@/components/DevPanel";

export default function Page() {
  const [aiParams, setAiParams] = useState({
    temperature: 1,
    style: "default",
    maxTokens: 150,
  });
  const [debug, setDebug] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleUpdateParams = (params: {
    temperature: number;
    style: string;
    maxTokens: number;
  }) => {
    setAiParams(params);
    if (debug) console.log("AI Parameters updated:", params);
  };

  const handleToggleDebug = (d: boolean) => {
    setDebug(d);
    console.log("Debug logging:", d ? "enabled" : "disabled");
  };

  const handleInjectMessage = (msg: string) => {
    setMessages((prev) => [...prev, `[Injected] ${msg}`]);
    if (debug) console.log("Injected message:", msg);
  };

  const handleSendMessage = async (msg: string) => {
    setMessages((prev) => [...prev, `User: ${msg}`]);

    // Simulate AI response (replace with real AI call)
    const aiResponse = `AI (${aiParams.style}, temp=${aiParams.temperature}): ${msg
      .split("")
      .reverse()
      .join("")}`;
    setMessages((prev) => [...prev, aiResponse]);
    if (debug) console.log("AI response:", aiResponse);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-900 text-white">
      <Header />
      <section className="py-6 conta
