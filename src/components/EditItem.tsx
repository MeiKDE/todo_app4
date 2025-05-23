import React from "react";
import { Todo, TodoUpdateInput } from "@/types";
import { useState } from "react";
import { formStyles, inputStyles, buttonStyles } from "@/styles/common";

interface EditItemProps {
  todo: Todo;
  onUpdate: (todoUpdateInput: TodoUpdateInput) => Promise<void>;
  exitEditMode: () => void;
}

const EditItem = ({ todo, onUpdate, exitEditMode }: EditItemProps) => {
  const [error, setError] = useState("");
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoDescription, setTodoDescription] = useState(todo.description);

  const onSave = async () => {
    //Check for required field
    if (!todoTitle.trim()) {
      setError("This field is required.");
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
      await onUpdate(updateInput);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      setError(errorMessage);
      console.error("onSave function failed to update todo");
    } finally {
      exitEditMode();
    }
  };

  const onCancel = () => {
    setError("");
    setTodoTitle(todo.title);
    setTodoDescription(todo.description);
    exitEditMode();
  };

  return (
    <div className={formStyles.container}>
      {error && <div className={formStyles.error}>{error}</div>}
      <div className={formStyles.field}>
        <label className={formStyles.label}>Title</label>
        <input
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
          value={todoTitle}
          placeholder="Enter title"
          className={`${inputStyles.base} ${error ? inputStyles.error : ""}`}
        />
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label}>Description</label>
        <input
          onChange={(e) => {
            setTodoDescription(e.target.value);
          }}
          value={todoDescription}
          placeholder="Enter description"
          className={inputStyles.base}
        />
      </div>
      <div className="text-sm text-gray-600">
        <p>Created: new Date(todo.createdAt).toLocaleString()</p>
        <p>Updated: new Date(todo.updatedAt).toLocaleString()</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} className={buttonStyles.primary}>
          Save
        </button>
        <button onClick={onCancel} className={buttonStyles.primary}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItem;
