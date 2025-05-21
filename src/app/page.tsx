"use client";
import React, { useEffect } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

const Home = () => {
  const {
    todos,
    isLoading,
    globalError,
    httpError,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  // Load initial data when component mounts
  useEffect(() => {
    getTodos();
  }, [getTodos]);

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
            <TodoForm createTodoHandler={createTodo} />
            {todos.length === 0 ? (
              renderEmptySpace()
            ) : (
              <TodoList
                todos={todos}
                updateTodoHandler={updateTodo}
                deleteTodoHandler={deleteTodo}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
