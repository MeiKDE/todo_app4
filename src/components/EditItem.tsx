import React from "react";
import { Todo, TodoUpdateInput } from "@/types";
import { useState } from "react";
import { formStyles, inputStyles, buttonStyles } from "@/styles/common";

interface EditItemProps {
  todo: Todo;
  updateTodoHandler: (updateInput: TodoUpdateInput) => Promise<void>;
  exitEditMode: () => void;
}

const EditItem = ({ todo, updateTodoHandler, exitEditMode }: EditItemProps) => {
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [todoDescription, setTodoDescription] = useState<string>(
    todo.description || ""
  );
  const [error, setError] = useState<string>("");

  const saveEdit = async () => {
    //Check for required field
    if (!todoTitle.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      const updateInput: TodoUpdateInput = {
        id: todo.id,
        title: todoTitle,
        description: todoDescription || "",
        completed: !todo.completed,
        updatedAt: new Date(),
      };
      await updateTodoHandler(updateInput);
      exitEditMode();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      setError(errorMessage);
    }
  };

  const cancelEdit = () => {
    setTodoTitle(todo.title);
    setTodoDescription(todo.description || "");
    setError("");
    exitEditMode();
  };

  return (
    <div className={formStyles.container}>
      {error && <div className={formStyles.error}>{error}</div>}
      <div className={formStyles.field}>
        <label className={formStyles.label}>Title</label>
        <input
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          placeholder="Enter title"
          className={`${inputStyles.base} ${error ? inputStyles.error : ""}`}
        />
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label}>Description</label>
        <input
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          placeholder="Enter description"
          className={inputStyles.base}
        />
      </div>
      <div className="text-sm text-gray-600">
        <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={saveEdit} className={buttonStyles.primary}>
          Save
        </button>
        <button onClick={cancelEdit} className={buttonStyles.primary}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItem;
