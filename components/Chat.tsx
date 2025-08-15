"use client";

import { useState, KeyboardEvent } from "react";

export interface ChatMessage {
  text: string;
  sender: "user" | "ai";
}

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => Promise<void>;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
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
    <div className="flex flex-col h-[70vh] overflow-hidden rounded-lg bg-black/50 p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-1 p-2 rounded ${msg.sender === "user" ? "bg-blue-500/50" : "bg-red-500/50"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <textarea
        className="w-full p-2 rounded resize-none bg-gray-800 text-white"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={2}
      />
    </div>
  );
};

export default Chat;
