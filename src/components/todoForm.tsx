import { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void; // function passed from App to add a new todo
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onAdd(trimmed);  // send input back to App
    setInput("");    // clear input field
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnterKey}
        placeholder="Enter a new task"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
}
