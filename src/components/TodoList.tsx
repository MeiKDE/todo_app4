import React from "react";
import { Todo } from "@/types/index";
import { useState } from "react";
import EditItem from "@/components/EditItem";
interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <section id="todo-list" className="flex-1">
      <h1 className="border border-pink-400 text-2xl">To Do List:</h1>

      {todos.map((todo) =>
        isEditing ? (
          <EditItem todo={todo} />
        ) : (
          <div key={todo.id} className="flex flex-col gap-4 bg-slate-50">
            <div id="title">
              <label>Title: {todo.title}</label>
            </div>
            <div id="description" className="flex flex-row gap-4">
              <label>Description: {todo.description}</label>
            </div>
            <div id="created-date" className="flex flex-row gap-4">
              <label>
                Created: {new Date(todo.createdAt).toLocaleString()}
              </label>
            </div>
            <div id="add-todo-button" className="flex flex-row gap-4">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Edit
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default TodoList;
