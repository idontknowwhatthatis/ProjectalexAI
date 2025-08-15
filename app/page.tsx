import { useState } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import DevPanel from "@/components/DevPanel";

export default function Page() {
  const [aiParams, setAiParams] = useState({ temperature: 1, style: "default", maxTokens: 150 });
  const [debug, setDebug] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

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

  return (
    <main>
      <Header />
      
      <section className="py-6">
        <Chat />
      </section>

      <div className="p-4 h-[80vh] overflow-auto bg-gradient-to-b from-black to-red-800 text-white rounded-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-1 p-2 bg-black/50 rounded break-words">
            {msg}
          </div>
        ))}
      </div>

      {/* DevPanel is hidden by default and can be toggled via your shortcut */}
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
