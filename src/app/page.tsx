"use client";
import React, { useEffect, useState } from "react";
import { Todo, TodoAddInput, TodoUpdateInput } from "@/types/index";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

const Home = () => {
  const [httpError, setHttpError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const renderLoadingSpinner = () => {
    return (
      <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
    );
  };

  const renderEmptySpace = () => {
    return (
      <div className="text-gray-500">
        No todos yet. Create one to get started!
      </div>
    );
  };

  //CRUD - Create, Read, Update, Delete API calls
  // Create - POST a new todo
  const createTodoHandler = async (todoAddInput: TodoAddInput) => {
    // Set default values
    setHttpError("");
    setGlobalError("");

    try {
      // Post data call
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoAddInput),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || "An http error occurred";
        setHttpError(errorMessage);
        throw new Error(errorMessage);
      }
      setTodos((prev) => [data, ...prev]);
      setIsLoading(true);
    } catch (err) {
      console.error("Failed to create todo:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Move getDataHandler before useEffect
  const getDataHandler = async () => {
    // Set default values
    setHttpError("");
    setGlobalError("");

    try {
      // Fetch data call
      const response = await fetch("/api/todos");
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || "An http error occurred";
        setHttpError(errorMessage);
        throw new Error(errorMessage);
      }
      setTodos(data);
      setIsLoading(true);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fix useEffect syntax
  useEffect(() => {
    getDataHandler();
  }, []); // Empty dependency array since getDataHandler is defined in component

  // Update - PUT an existing todo by id
  const updateTodoHandler = async (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => {
    // Set default values
    setHttpError("");
    setGlobalError("");

    try {
      // Fetch data call
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoUpdateInput),
      });
      const updatedData = await response.json();

      // Check Http
      if (!response.ok) {
        const errorMessage = updatedData?.error || "An http error occurred";
        setHttpError(errorMessage);
        throw new Error(errorMessage);
      }
      setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));
      setIsLoading(true);
    } catch (err) {
      console.error("Failed to update todos:", err);
      setGlobalError("A network or system error occurred.  Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete - DELETE todo by id
  const deleteTodoHandler = async (id: number) => {
    // Set default values
    setHttpError("");
    setGlobalError("");

    try {
      // Fetch data call
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // Check Http
      if (!response.ok) {
        const errorMessage = "Failed to delete todo";
        setHttpError(errorMessage);
        throw new Error(errorMessage);
      }
      setTodos(todos.filter((todo) => todo.id !== id));
      setIsLoading(true);
    } catch (err) {
      console.error("Failed to delete todos:", err);
      setGlobalError("A network or system error occurred.  Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <section className="text-red-500">
        {(httpError || globalError) && (
          <div>
            {httpError && <div>{httpError}</div>}
            {globalError && <div>{globalError}</div>}
          </div>
        )}
      </section>

      <section className="flex flex-row gap-4 p-4">
        {isLoading ? (
          renderLoadingSpinner()
        ) : (
          <>
            <TodoForm createTodo={createTodoHandler} />
            {todos.length === 0 ? (
              renderEmptySpace()
            ) : (
              <TodoList
                todos={todos}
                updateTodo={updateTodoHandler}
                deleteTodo={deleteTodoHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
