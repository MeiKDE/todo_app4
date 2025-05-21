"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Todo, TodoAddInput, TodoUpdateInput } from "@/types/index";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

// Create useEditingGlobalError hook to wrap isEditing and globalError states and withGlobalErrorHandling wrapper function.
// const useEditingGlobalError = () => {
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [globalError, setGlobalError] = useState<string>("");
//   // Create a withLoadingError wrapper for DRY coding purpose
//   const withGlobalErrorHandling = async (operation: () => Promise<void>) => {
//     setGlobalError("");
//     setIsEditing(true);
//     try {
//       // Call API
//       const response = await operation();
//     } catch (err) {
//       //check for unexpected global error
//       const errorMessage =
//         err instanceof Error ? err.message : "An unexpected error has occurred";
//       setGlobalError(errorMessage);
//       console.error("Operation failed:", err);
//     } finally {
//       setIsEditing(false);
//     }
//   };
//   return { isEditing, globalError, withGlobalErrorHandling, setGlobalError };
// };

// // Create a withLoadingError wrapper for DRY coding purpose
// const withGlobalErrorHandling = async (operation: () => Promise<void>) => {
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [globalError, setGlobalError] = useState<string>("");
//   setGlobalError("");
//   setIsEditing(true);
//   try {
//     // Call API
//     const response = await operation();
//   } catch (err) {
//     //check for unexpected global error
//     const errorMessage =
//       err instanceof Error ? err.message : "An unexpected error has occurred";
//     setGlobalError(errorMessage);
//     console.error("Operation failed:", err);
//   } finally {
//     setIsEditing(false);
//   }
// };

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  //Create CRUD API Calls
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");

  // Load initial data when component mounts
  useEffect(() => {
    getDataHandler();
  }, []);

  // READ - make GET API call to render todo data
  const getDataHandler = async () => {
    setGlobalError("");
    setIsEditing(true);

    // Call API
    const response = await fetch("/api/todos");

    // Validate HTTP error
    if (!response.ok) {
      //creating an object that can optionally hold an error message as a string,
      // but starts off empty.
      let errorData: { error?: string } = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
        throw new Error(errorData?.error || "Failed to fetch todos");
      } finally {
        setGlobalError(errorData?.error || "Unexpected error has occurred");
        console.error(
          "Unexpected error has occurred to fetch todos",
          errorData
        );
        setIsEditing(false);
      }
    }

    // If no error
    const data = await response.json();
    setTodos(data);
  };

  // //useCallback is used to avoid children components from being re-rendered
  // const getDataHandler = useCallback(() => {}, []);

  // CREATE a new todo
  const createTodoHandler = async (todoAddInput: TodoAddInput) => {
    setGlobalError("");
    setIsEditing(true);

    // Call API
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todoAddInput),
    });

    // Validate HTTP error
    if (!response.ok) {
      //creating an object that can optionally hold an error message as a string,
      // but starts off empty.
      let errorData: { error?: string } = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      } finally {
        setGlobalError(errorData?.error || "Failed to create todos");
        console.error("Global error unable to create todos", errorData);
        setIsEditing(false);
        throw new Error(errorData?.error || "Failed to create todos");
      }
    }

    // If no error
    const data = await response.json();
    setTodos((prev) => [data, ...prev]); //prepend
  };

  // UPDATE todo
  const updateTodoHandler = async (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => {
    setGlobalError("");
    setIsEditing(true);

    // Call API
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todoUpdateInput),
    });

    // Validate HTTP error
    if (!response.ok) {
      //creating an object that can optionally hold an error message as a string,
      // but starts off empty.
      let errorData: { error?: string } = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      } finally {
        setGlobalError(errorData?.error || "Failed to create todos");
        console.error("Global error unable to create todos", errorData);
        setIsEditing(false);
        throw new Error(errorData?.error || "Failed to create todos");
      }
    }

    // If no error
    const updatedData = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));
  };

  // DELETE todo
  const deleteTodoHandler = async (id: number) => {
    setGlobalError("");
    setIsEditing(true);

    // Call API
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    // Validate HTTP error
    if (!response.ok) {
      //creating an object that can optionally hold an error message as a string,
      // but starts off empty.
      let errorData: { error?: string } = {};
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      } finally {
        setGlobalError(errorData?.error || "Failed to create todos");
        console.error("Global error unable to create todos", errorData);
        setIsEditing(false);
        throw new Error(errorData?.error || "Failed to create todos");
      }
    }
    // If no error
    setTodos(todos.filter((todo) => todo.id != id));
  };

  return (
    <section className="flex flex-row gap-4 p-4">
      <TodoForm createTodoHandler={createTodoHandler} />
      {/*flex-1 take up equal width*/}
      <TodoList todos={todos} />
    </section>
  );
};

export default Home;
