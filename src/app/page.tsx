"use client";
import React, { useState, useEffect } from "react";
import { Todo, TodoAddInput, TodoUpdateInput } from "@/types/index";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const [globalError, setGlobalError] = useState<string>("");

  useEffect(() => {
    getDataHandler();
  }, []);

  // Setup CRUD API Calls
  // CREATE - POST
  const createTodoHandler = async (todoAddInput: TodoAddInput) => {
    // Set default states
    setHttpError("");
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoAddInput),
      });

      const data = await response.json();

      // Check for Http error
      if (!response.ok) {
        const errorMessage =
          data?.error || "Failed to create todo due to http error";
        setHttpError(errorMessage);
        throw new Error(errorMessage); // ❗ Purpose: stop here and go to catch
      }

      // If data clears
      setTodos((prev) => [data, ...prev]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create todo due to parsing JSON";
      setGlobalError(errorMessage);
      throw err; // ❗ Purpose: pass the error up to the parent component
    } finally {
      setIsLoading(false);
    }
  };

  // READ - GET
  const getDataHandler = async () => {
    // Set default states
    setHttpError("");
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      // Check for Http error
      if (!response.ok) {
        const errorMessage =
          data?.error || "Failed to fetch todos due to http error";
        setHttpError(errorMessage);
        throw new Error(errorMessage); // ❗ Purpose: stop here and go to catch
      }

      // If data clears
      setTodos(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch todos due to parsing JSON";
      setGlobalError(errorMessage);
      throw err; // ❗ Purpose: pass the error up to the parent component
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE - PUT
  const updateDataHandler = async (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => {
    // Set default states
    setHttpError("");
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoUpdateInput),
      });

      const updatedData = await response.json();

      // Check for Http error
      if (!response.ok) {
        const errorMessage =
          updatedData?.error || "Failed to update todos due to http error";
        setHttpError(errorMessage);
        throw new Error(errorMessage); // ❗ Purpose: stop here and go to catch
      }

      // If data clears
      setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch todos due to parsing JSON";
      setGlobalError(errorMessage);
      throw err; // ❗ Purpose: pass the error up to the parent component
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE - DELETE
  const deleteDataHandler = async (id: number) => {
    // Set default states
    setHttpError("");
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // Check for Http error
      if (!response.ok) {
        setHttpError("Failed to delete todos due to http error");
        throw new Error("Failed to delete todos due to http error"); // ❗ Purpose: stop here and go to catch
      }

      // If data clears
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to delete todos due to parsing JSON";
      setGlobalError(errorMessage);
      throw err; // ❗ Purpose: pass the error up to the parent component
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
    );
  };

  const renderEmptySpace = () => {
    return (
      <div className=" w-[500px] h-[500px] bg-white">
        <div>No todos yet. Create one to get started!</div>
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-center items-center ">
      <div className="flex flex-row gap-5 justify-center items-center">
        {/* Display errors */}
        {httpError && (
          <div className="text-red-500 mb-4">HTTP Error: {httpError}</div>
        )}
        {globalError && (
          <div className="text-red-500 mb-4">Error: {globalError}</div>
        )}

        {isLoading ? (
          renderLoadingSpinner()
        ) : (
          <div className="flex flex-row gap-4">
            <TodoForm createTodo={createTodoHandler} />

            <div className="flex flex-row gap-4">
              <div>
                {todos.length === 0 ? (
                  renderEmptySpace()
                ) : (
                  <>
                    <div>
                      <h1 className="text-2xl text-center">Todo List</h1>
                    </div>
                    {todos.map((todo) => (
                      <TodoList
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateDataHandler}
                        deleteTodo={deleteDataHandler}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
