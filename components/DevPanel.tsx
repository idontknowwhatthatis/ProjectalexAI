"use client";

import { useState, useEffect } from "react";

interface DevPanelProps {
  onUpdateParams: (params: { temperature: number; style: string; maxTokens: number }) => void;
  onToggleDebug: (d: boolean) => void;
  onInjectMessage: (msg: string) => void;
}

const DevPanel: React.FC<DevPanelProps> = ({ onUpdateParams, onToggleDebug, onInjectMessage }) => {
  const [temperature, setTemperature] = useState(1);
  const [style, setStyle] = useState("default");
  const [maxTokens, setMaxTokens] = useState(150);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        const panel = document.getElementById("dev-panel");
        if (panel) panel.classList.toggle("hidden");
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleApply = () => {
    onUpdateParams({ temperature, style, maxTokens });
    onToggleDebug(debug);
  };

  return (
    <div
      id="dev-panel"
      className="hidden fixed bottom-4 right-4 w-80 p-4 bg-gray-900 text-white rounded-lg shadow-lg z-50"
    >
      <h3 className="font-bold mb-2">Dev Panel</h3>
      <div className="mb-2">
        <label className="block">Temperature:</label>
        <input
          type="number"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={e => setTemperature(parseFloat(e.target.value))}
          className="w-full p-1 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Style:</label>
        <select value={style} onChange={e => setStyle(e.target.value)} className="w-full p-1 rounded bg-gray-700 text-white">
          <option value="default">Default</option>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Max Tokens:</label>
        <input
          type="number"
          value={maxTokens}
          onChange={e => setMaxTokens(parseInt(e.target.value))}
          className="w-full p-1 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Debug Logging:</label>
        <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} />
      </div>
      <div className="mb-2">
        <label className="block">Inject Message:</label>
        <input
          type="text"
          placeholder="Message..."
          onKeyDown={e => {
            if (e.key === "Enter") onInjectMessage((e.target as HTMLInputElement).value);
          }}
          className="w-full p-1 rounded bg-gray-700 text-white"
        />
      </div>
      <button onClick={handleApply} className="w-full p-2 bg-blue-600 rounded mt-2">
        Apply
      </button>
    </div>
  );
};

export default DevPanel;
