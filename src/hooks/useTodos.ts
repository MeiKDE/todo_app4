import { useState, useCallback } from "react";
import { Todo, TodoAddInput, TodoUpdateInput, ErrorHandlers } from "@/types";

interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  globalError: string;
  httpError: string;
  getTodos: () => Promise<void>;
  createTodo: (todoAddInput: TodoAddInput) => Promise<void>;
  updateTodo: (id: number, todoUpdateInput: TodoUpdateInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

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

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");

  const getTodos = useCallback(async () => {
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

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Unexpected error while fetching todos:", err);
      setGlobalError("A network or system error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (todoAddInput: TodoAddInput) => {
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
  }, []);

  const updateTodo = useCallback(
    async (id: number, todoUpdateInput: TodoUpdateInput) => {
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
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
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
    },
    [todos]
  );

  return {
    todos,
    isLoading,
    globalError,
    httpError,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
