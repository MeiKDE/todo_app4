import React from "react";
import { Todo, TodoUpdateInput } from "@/types/index";
import { useState } from "react";
import EditItem from "@/components/EditItem";
import DisplayList from "@/components/DisplayList";

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: number, todoUpdateInput: TodoUpdateInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoListProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false); // used for toggling pages
  const [editingTodoId, setEditingTodoId] = useState<number>(0);

  const enterEditMode = (todoId: number) => {
    setEditingTodoId(todoId);
    setIsEditing(true);
  };

  const exitEditMode = (todoId: number) => {
    setEditingTodoId(todoId);
    setIsEditing(false);
  };
  return (
    <section id="todo-list" className="flex-1">
      <h1 className="text-2xl font-bold mb-4">To Do List:</h1>

      {todos.map((todo) =>
        isEditing && editingTodoId === todo.id ? (
          <EditItem
            key={todo.id}
            todo={todo}
            onUpdate={(todoUpdateInput) => updateTodo(todo.id, todoUpdateInput)}
            exitEditMode={() => exitEditMode(todo.id)}
          />
        ) : (
          <DisplayList
            key={todo.id}
            todo={todo}
            enterEditMode={() => enterEditMode(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )
      )}
    </section>
  );
};

export default TodoList;
