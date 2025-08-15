"use client";

import { KeyboardEvent, useState } from "react";

interface ChatProps {
  messages: { sender: string; text: string }[];
  onSendMessage: (msg: string) => Promise<void>;
}

export default function Chat({ messages, onSendMessage }: ChatProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        await onSendMessage(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 h-[60vh] overflow-auto bg-black/50 rounded-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-1 p-2 bg-black/30 rounded">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <textarea
        className="w-full p-2 rounded bg-black/30 text-white"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={2}
      />
    </div>
  );
}
