"use client";
import { Todo, TodoUpdateInput } from "@/types/index";
import { useState } from "react";

interface TodoListProps {
  todo: Todo;
  updateTodo: (id: number, todoUpdateInput: TodoUpdateInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoList = ({ todo, updateTodo, deleteTodo }: TodoListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const confirmAndDeleteTodo = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${todo.title}? `
      );
      if (confirmed) {
        setIsEditing(true);
        await deleteTodo(todo.id);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete todo item.";
      setError(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  const exitMode = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setIsEditing(false);
    setError("");
  };

  const validateAndUpdateTodo = async () => {
    if (!title.trim()) {
      setError("Title field is required.");
      return;
    }

    try {
      setIsEditing(true);
      setError("");

      const updatedTodo: TodoUpdateInput = {
        title: title.trim(),
        description: description?.trim() ?? "",
        completed: todo.completed,
        updatedAt: new Date(),
      };

      await updateTodo(todo.id, updatedTodo);
      setError("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo item.";
      setError(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {isEditing ? (
        <section id="edit-item" className=" w-96">
          <div className="bg-white h-full gap-4">
            <div id="title-label">
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                placeholder="Enter title"
                className="w-full"
              />
            </div>
            <div id="description-label">
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                placeholder="Enter description"
                rows={8}
                className="w-full"
              />
            </div>
            <div id="created-date-label">
              <label>
                Created: {new Date(todo.createdAt).toLocaleString()}
              </label>
            </div>
            <div id="updated-date-label">
              <label>
                Updated: {new Date(todo.updatedAt).toLocaleString()}
              </label>
            </div>

            <div className="flex flex-row gap-5">
              <button onClick={validateAndUpdateTodo} className="bg-blue-300">
                Save
              </button>
              <button onClick={exitMode} className="bg-blue-300">
                Cancel
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section id="display-item" className=" w-96">
          <div className="bg-white h-full gap-4">
            <div id="title-label">
              <label> Title: {todo.title}</label>
            </div>
            <div id="description-label">
              <label> Description: {todo.description}</label>
            </div>
            <div id="created-date-label">
              <label>
                Created: {new Date(todo.createdAt).toLocaleString()}
              </label>
            </div>
            <div id="updated-date-label">
              <label>
                Updated: {new Date(todo.updatedAt).toLocaleString()}
              </label>
            </div>

            <div className="flex flex-row gap-5">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-blue-300"
              >
                Edit
              </button>
              <button onClick={confirmAndDeleteTodo} className="bg-blue-300">
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TodoList;
