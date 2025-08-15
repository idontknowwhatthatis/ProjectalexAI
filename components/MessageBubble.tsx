import React from "react";
import ReactMarkdown from "react-markdown";

export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
        isUser ? "bg-brand-600/90" : "bg-slate-800/80 border border-white/5"
      }`}>
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <div className="prose prose-invert prose-pre:bg-slate-900/70 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
