"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Todo,
  TodoAddInput,
  TodoUpdateInput,
  ErrorHandlers,
} from "@/types/index";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export const handleApiError = async (
  response: Response,
  { fallbackMessage, setHttpError, setGlobalError }: ErrorHandlers
): Promise<never> => {
  let message = fallbackMessage;

  try {
    const errorData = await response.json();
    if (errorData?.error) {
      message = errorData.error;
      setHttpError(message);
    } else {
      setGlobalError(message);
    }
  } catch (parseErr) {
    console.warn("Failed to parse error JSON", parseErr);
    setGlobalError("Unexpected error format from server.");
  }

  console.error("API error:", message);
  throw new Error(message);
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");

  // Load initial data when component mounts
  useEffect(() => {
    getDataHandler();
  }, []);

  // READ - make GET API call to render todo data
  // const getDataHandler = async () => {
  //   setGlobalError("");
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("/api/todos");

  //     if (!response.ok) {
  //       let message = "Failed to fetch todos";

  //       try {
  //         const errorData = await response.json();

  //         if (errorData?.error) {
  //           message = errorData.error;
  //           setHttpError(message); // HTTP error returned by backend (e.g. 400/500)
  //         } else {
  //           setGlobalError(message); // Unexpected structure in error response
  //         }
  //       } catch (parseErr) {
  //         console.warn("Failed to parse error JSON", parseErr);
  //         setGlobalError("Unexpected error format from server."); // Parsing failure
  //       }

  //       setIsLoading(false);
  //       console.error("Fetch error:", message);
  //       throw new Error(message); // Let outer try/catch handle it
  //     }

  //     // ✅ success: parse and use data
  //     const todos = await response.json();
  //     setTodos(todos);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error("Unexpected error while fetching todos:", err);
  //     setGlobalError("A network or system error occurred. Please try again.");
  //     setIsLoading(false);
  //   }
  // };

  const getDataHandler = async () => {
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/todos");

      if (!response.ok) {
        await handleApiError(response, {
          fallbackMessage: "Failed to fetch todos",
          setHttpError,
          setGlobalError,
        });
      }

      const todos = await response.json();
      setTodos(todos);
    } catch (err) {
      console.error("Unexpected error while fetching todos:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE a new todo
  // const createTodoHandler = async (todoAddInput: TodoAddInput) => {
  //   setGlobalError("");
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("/api/todos", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(todoAddInput),
  //     });

  //     if (!response.ok) {
  //       let message = "Failed to create todo";

  //       try {
  //         const errorData = await response.json();
  //         if (errorData?.error) {
  //           message = errorData.error;
  //           setHttpError(message);
  //         } else {
  //           setGlobalError(message);
  //         }
  //       } catch (parseErr) {
  //         console.warn("Failed to parse error response JSON", parseErr);
  //         setGlobalError("Unexpected error format from server.");
  //       }

  //       setIsLoading(false);
  //       console.error("Error creating todo:", message);
  //       throw new Error(message);
  //     }

  //     const data = await response.json();
  //     setTodos((prev) => [data, ...prev]);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error("Unexpected error while creating todo:", err);
  //     setGlobalError("A network or system error occurred. Please try again.");
  //     setIsLoading(false);
  //   }
  // };
  const createTodoHandler = async (todoAddInput: TodoAddInput) => {
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoAddInput),
      });

      if (!response.ok) {
        await handleApiError(response, {
          fallbackMessage: "Failed to create todo",
          setHttpError,
          setGlobalError,
        });
      }

      const data = await response.json();
      setTodos((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Unexpected error while creating todo:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE todo
  // const updateTodoHandler = async (
  //   id: number,
  //   todoUpdateInput: TodoUpdateInput
  // ) => {
  //   setGlobalError("");
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(`/api/todos/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(todoUpdateInput),
  //     });

  //     if (!response.ok) {
  //       let message = "Failed to update todo";

  //       try {
  //         const errorData = await response.json();
  //         if (errorData?.error) {
  //           message = errorData.error;
  //           setHttpError(message);
  //         } else {
  //           setGlobalError(message);
  //         }
  //       } catch (parseErr) {
  //         console.warn("Failed to parse error response JSON", parseErr);
  //         setGlobalError("Unexpected error format from server.");
  //       }

  //       setIsLoading(false);
  //       console.error("Error updating todo:", message);
  //       throw new Error(message);
  //     }

  //     const updatedData = await response.json();
  //     setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error("Unexpected error while updating todo:", err);
  //     setGlobalError("A network or system error occurred. Please try again.");
  //     setIsLoading(false);
  //   }
  // };
  const updateTodoHandler = async (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => {
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoUpdateInput),
      });

      if (!response.ok) {
        await handleApiError(response, {
          fallbackMessage: "Failed to update todo",
          setHttpError,
          setGlobalError,
        });
      }

      const updatedData = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedData : todo)));
    } catch (err) {
      console.error("Unexpected error while updating todo:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE todo
  // const deleteTodoHandler = async (id: number) => {
  //   setGlobalError("");
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(`/api/todos/${id}`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!response.ok) {
  //       let message = "Failed to delete todo";

  //       try {
  //         const errorData = await response.json();
  //         if (errorData?.error) {
  //           message = errorData.error;
  //           setHttpError(message);
  //         } else {
  //           setGlobalError(message);
  //         }
  //       } catch (parseErr) {
  //         console.warn("Failed to parse error response JSON", parseErr);
  //         setGlobalError("Unexpected error format from server.");
  //       }

  //       setIsLoading(false);
  //       console.error("Error deleting todo:", message);
  //       throw new Error(message);
  //     }

  //     setTodos(todos.filter((todo) => todo.id !== id));
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error("Unexpected error while deleting todo:", err);
  //     setGlobalError("A network or system error occurred. Please try again.");
  //     setIsLoading(false);
  //   }
  // };
  const deleteTodoHandler = async (id: number) => {
    setGlobalError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        await handleApiError(response, {
          fallbackMessage: "Failed to delete todo",
          setHttpError,
          setGlobalError,
        });
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Unexpected error while deleting todo:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  };
  const renderEmptySpace = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Empty list. Create your first todo.</p>
      </div>
    );
  };

  return (
    <>
      {(globalError || httpError) && (
        <div>
          {httpError}
          {globalError}
        </div>
      )}

      <section className="flex flex-row gap-4 p-4">
        {isLoading ? (
          renderLoadingSpinner()
        ) : (
          <>
            <TodoForm createTodoHandler={createTodoHandler} />
            {todos.length === 0 ? (
              renderEmptySpace()
            ) : (
              <TodoList
                todos={todos}
                updateTodoHandler={updateTodoHandler}
                deleteTodoHandler={deleteTodoHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
