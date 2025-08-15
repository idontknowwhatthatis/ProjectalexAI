"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface ChatProps {
  messages: string[];
  onSendMessage: (msg: string) => void;
}

export default function Chat({ messages, onSendMessage }: ChatProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] border border-gray-700 rounded-lg overflow-hidden">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-black">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="mb-2 p-2 bg-black/50 rounded break-words"
          >
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-700 bg-black/80">
        <textarea
          className="w-full p-2 rounded bg-black text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-700"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="mt-2 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
