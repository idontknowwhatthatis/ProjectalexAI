"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble, { type Message } from "@/components/MessageBubble";

function newId() { return Math.random().toString(36).slice(2); }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: newId(), role: "model", content: "Hello Alex. I’m ProjectAlex AI, powered by Gemini 2.5 Flash. How can I assist today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: newId(), role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) })
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const modelMsg: Message = { id: newId(), role: "model", content: data.reply };
      setMessages((m) => [...m, modelMsg]);
    } catch (err: any) {
      setMessages((m) => [...m, { id: newId(), role: "model", content: `⚠️ Error: ${err?.message || "request failed"}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] container-max">
      <div className="flex-1 overflow-y-auto py-6 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {loading && (
          <div className="text-xs text-slate-400 animate-pulse">ProjectAlex AI is thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="sticky bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent py-4">
        <div className="card p-2">
          <div className="flex items-end gap-2">
            <textarea
              className="input min-h-[52px] max-h-40 resize-y"
              placeholder="Ask anything… (Shift+Enter for newline)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
            />
            <button type="submit" className="btn h-[52px] px-5">Send</button>
          </div>
          <div className="flex justify-between text-xs text-slate-400 px-1 pt-2">
            <span>Model: <code>gemini-2.5-flash</code></span>
            <span>Branding: <strong>ProjectAlex AI</strong></span>
          </div>
        </div>
      </form>
    </div>
  );
}
