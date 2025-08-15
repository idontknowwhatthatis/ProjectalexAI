"use client";

import { useState, KeyboardEvent } from "react";

interface ChatProps {
  messages: string[];
  onSendMessage: (msg: string) => Promise<void>;
}

export default function Chat({ messages, onSendMessage }: ChatProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gradient-to-b from-black to-red-800 text-white p-4 rounded-lg overflow-auto">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-1 p-2 bg-black/50 rounded break-words">
            {msg}
          </div>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="w-full p-2 rounded bg-black/20 placeholder-gray-400 resize-none focus:outline-none"
        rows={2}
      />
    </div>
  );
}
