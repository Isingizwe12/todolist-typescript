
import './App.css'

import React, { useState } from "react";
import TodoForm from './components/TodoForm'
import TodoList from "./components/TodoList";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  // main todos state
  const [todos, setTodos] = useState<Todo[]>([]);

  // add a new todo (called from TodoForm)
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-slate-800">
              To-Do List
            </h1>
            <p className="text-md text-slate-500">Drag to re-order</p>
          </div>

          {/* Todo form (input + add button) */}
          <TodoForm onAdd={addTodo} />

          {/* Spacer */}
          <div className="mt-6">
            {/* TodoList will handle rendering + drag & drop */}
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </div>

      
      </div>
    </div>
  );
}
