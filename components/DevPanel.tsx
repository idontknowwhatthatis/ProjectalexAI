import { useState, useEffect } from "react";

interface DevPanelProps {
  onUpdateParams: (params: { temperature: number; style: string; maxTokens: number }) => void;
  onToggleDebug: (debug: boolean) => void;
  onInjectMessage: (message: string) => void;
}

export default function DevPanel({ onUpdateParams, onToggleDebug, onInjectMessage }: DevPanelProps) {
  const [visible, setVisible] = useState(false);
  const [temperature, setTemperature] = useState(1);
  const [style, setStyle] = useState("default");
  const [maxTokens, setMaxTokens] = useState(150);
  const [debug, setDebug] = useState(false);
  const [testMessage, setTestMessage] = useState("");

  // Secret shortcut Ctrl + A to toggle visibility
  useEffect(() => {
    const togglePanel = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setVisible(v => !v);
      }
    };
    window.addEventListener("keydown", togglePanel);
    return () => window.removeEventListener("keydown", togglePanel);
  }, []);

  if (!visible) return null;

  const handleSaveParams = () => {
    onUpdateParams({ temperature, style, maxTokens });
  };

  const handleToggleDebug = () => {
    setDebug(!debug);
    onToggleDebug(!debug);
  };

  const handleInjectMessage = () => {
    if (testMessage.trim()) {
      onInjectMessage(testMessage.trim());
      setTestMessage("");
    }
  };

  return (
    <div className="fixed top-4 right-4 w-96 h-[500px] bg-black/90 text-white p-4 rounded-lg shadow-lg z-50 overflow-auto">
      <h2 className="text-lg font-bold mb-2">ProjectAlex AI Dev Panel</h2>

      {/* AI Parameters */}
      <div className="mb-4">
        <label className="block mb-1">
          Temperature:
          <input
            type="number"
            min={0} max={2} step={0.1}
            className="ml-2 text-black w-20"
            value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
          />
        </label>

        <label className="block mb-1">
          Response Style:
          <select className="ml-2 text-black w-32" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="default">Default</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="sarcastic">Sarcastic</option>
          </select>
        </label>

        <label className="block mb-1">
          Max Tokens:
          <input
            type="number"
            min={1} max={2000}
            className="ml-2 text-black w-24"
            value={maxTokens}
            onChange={e => setMaxTokens(parseInt(e.target.value))}
          />
        </label>

        <button
          onClick={handleSaveParams}
          className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Save Parameters
        </button>
      </div>

      {/* Debug toggle */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={debug}
            onChange={handleToggleDebug}
            className="accent-red-600"
          />
          <span>Enable Debug Logging</span>
        </label>
      </div>

      {/* Test message injector */}
      <div className="mb-2">
        <label>
          Test Message:
          <input
            type="text"
            className="ml-2 text-black w-full"
            value={testMessage}
            onChange={e => setTestMessage(e.target.value)}
            placeholder="Type message to inject..."
          />
        </label>
        <button
          onClick={handleInjectMessage}
          className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 w-full"
        >
          Inject Message
        </button>
      </div>
    </div>
  );
}
