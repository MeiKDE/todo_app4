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
      // Set states
      setIsEditing(true);

      const confirmed = window.confirm(
        `Are you sure you want to delete ${todo.title}? `
      );
      if (confirmed) {
        await deleteTodo(todo.id);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete todo item.";
      setError(errorMessage);
      throw new Error(errorMessage); //stops execution here
    } finally {
      setIsEditing(false);
    }
  };

  const exitMode = () => {
    try {
      setTitle(todo.title);
      setDescription(todo.description);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to exit from updating todo item.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  const validateAndUpdateTodo = async () => {
    try {
      // Set states
      setIsEditing(true);
      setError(""); // Clear any previous errors

      //Check field input(s)
      if (!title.trim()) {
        setError("Title field is required.");
        return;
      }

      await updateTodo(todo.id, {
        title: title,
        description: description,
        completed: !todo.completed,
        updatedAt: new Date(),
      });

      setError(""); // Clear error on successful update
      exitMode();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo item.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {isEditing ? (
        <section id="edit-item" className=" w-96">
          <h1 className="text-2xl text-center">Todo List:</h1>
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
