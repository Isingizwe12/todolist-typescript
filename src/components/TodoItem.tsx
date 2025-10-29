import React from "react";

type TaskItemProps = {
  id: string;
  text: string;
  done: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  text,
  done,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div
      className={`flex justify-between items-center w-72 px-5 py-4 rounded-2xl border border-white/40 backdrop-blur-md shadow-md bg-gradient-to-r ${
        done
          ? "from-emerald-200 to-green-100"
          : "from-indigo-100 to-pink-100"
      } transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={onToggle}
          className="w-5 h-5 accent-indigo-600"
        />
        <span
          className={`text-lg ${
            done
              ? "line-through text-gray-400"
              : "text-indigo-800 font-semibold"
          }`}
        >
          {text}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 font-bold text-xl"
      >
        ×
      </button>
    </div>
  );
}
