import React from "react";
import { Todo, TodoUpdateInput } from "@/types/index";
import { useState } from "react";
import EditItem from "@/components/EditItem";
import DisplayList from "@/components/DisplayList";

interface TodoListProps {
  todos: Todo[];
  updateTodoHandler: (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => Promise<void>;
  deleteTodoHandler: (id: number) => Promise<void>;
}

const TodoList = ({
  todos,
  updateTodoHandler,
  deleteTodoHandler,
}: TodoListProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<number>(0);

  const onClickDisplayList = (todoId: number) => {
    setEditingTodoId(todoId);
    setIsEditing(true);
  };

  const onClickEditItem = (todoId: number) => {
    setEditingTodoId(todoId);
    setIsEditing(false);
  };

  return (
    <section id="todo-list" className="flex-1">
      <h1 className="border border-pink-400 text-2xl">To Do List:</h1>

      {todos.map((todo) =>
        isEditing && editingTodoId === todo.id ? (
          <EditItem
            key={todo.id}
            todo={todo}
            updateTodoHandler={(updateInput) =>
              updateTodoHandler(todo.id, updateInput)
            }
            onClickEditItem={() => onClickEditItem(todo.id)}
          />
        ) : (
          <DisplayList
            key={todo.id}
            todo={todo}
            onClickDisplayList={() => onClickDisplayList(todo.id)}
            deleteTodoHandle={() => deleteTodoHandler(todo.id)}
          />
        )
      )}
    </section>
  );
};

export default TodoList;
