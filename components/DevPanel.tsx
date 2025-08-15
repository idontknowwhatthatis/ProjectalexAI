"use client";

import { useState, useEffect } from "react";

interface DevPanelProps {
  onUpdateParams: (params: { temperature: number; style: string; maxTokens: number }) => void;
  onToggleDebug: (d: boolean) => void;
  onInjectMessage: (msg: string) => void;
}

export default function DevPanel({ onUpdateParams, onToggleDebug, onInjectMessage }: DevPanelProps) {
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState(1);
  const [style, setStyle] = useState("default");
  const [maxTokens, setMaxTokens] = useState(150);
  const [debug, setDebug] = useState(false);
  const [inject, setInject] = useState("");

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        setVisible(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => onUpdateParams({ temperature: temp, style, maxTokens }), [temp, style, maxTokens]);
  useEffect(() => onToggleDebug(debug), [debug]);

  return visible ? (
    <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg shadow-lg z-50 w-80 text-white flex flex-col gap-2">
      <h2 className="text-lg font-bold">Dev Panel</h2>
      <label>
        Temp:
        <input type="number" step={0.1} min={0} max={2} value={temp} onChange={e => setTemp(Number(e.target.value))} />
      </label>
      <label>
        Style:
        <select value={style} onChange={e => setStyle(e.target.value)}>
          <option value="default">Default</option>
          <option value="funny">Funny</option>
          <option value="formal">Formal</option>
        </select>
      </label>
      <label>
        Max Tokens:
        <input type="number" value={maxTokens} onChange={e => setMaxTokens(Number(e.target.value))} />
      </label>
      <label>
        Debug:
        <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} />
      </label>
      <label>
        Inject Message:
        <input type="text" value={inject} onChange={e => setInject(e.target.value)} />
        <button onClick={() => { onInjectMessage(inject); setInject(""); }}>Send</button>
      </label>
    </div>
  ) : null;
}
