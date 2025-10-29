import React, { useState, useRef } from "react";
import TaskItem from "./components/TodoItem";

type Task = {
  id: string;
  text: string;
  done: boolean;
  x: number;
  y: number;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  function addTask() {
    const text = input.trim();
    if (!text) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
      x: window.innerWidth / 2 - 150,
      y: 160 + tasks.length * 80,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  }

  function toggleTask(id: string) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleMouseDown(e: React.MouseEvent, id: string) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDraggingId(id);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!draggingId) return;
    const { x, y } = offset.current;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggingId
          ? { ...task, x: e.clientX - x, y: e.clientY - y }
          : task
      )
    );
  }

  function handleMouseUp() {
    setDraggingId(null);
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-pink-200 via-sky-100 to-indigo-200 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header & Input */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 text-center z-50">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 tracking-tight drop-shadow-sm">
          My  Tasks 
        </h1>
        <div className="flex gap-3 justify-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's next on your list?"
            className="border-0 rounded-full px-5 py-3 w-72 shadow-lg bg-white/60 backdrop-blur-md placeholder:text-slate-500 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Draggable Tasks */}
      {tasks.map((task) => (
        <div
          key={task.id}
          onMouseDown={(e) => handleMouseDown(e, task.id)}
          className={`absolute cursor-grab active:cursor-grabbing transition-transform ${
            draggingId === task.id
              ? "scale-105 drop-shadow-2xl"
              : "drop-shadow-lg"
          }`}
          style={{ left: task.x, top: task.y }}
        >
          <TaskItem
            id={task.id}
            text={task.text}
            done={task.done}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        </div>
      ))}

     
    </div>
  );
}
