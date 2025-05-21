import { Todo, TodoUpdateInput } from "@/types";
import { useState } from "react";

interface EditItemProps {
  todo: Todo;
  updateTodoHandler: (updateInput: TodoUpdateInput) => Promise<void>;
  onClickEditItem: () => void;
}

const EditItem = ({
  todo,
  updateTodoHandler,
  onClickEditItem,
}: EditItemProps) => {
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [todoDescription, setTodoDescription] = useState<string>(
    todo.description || ""
  );
  const [error, setError] = useState<string>("");

  const onSave = async () => {
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
        completed: todo.completed,
        updatedAt: new Date(),
      };
      await updateTodoHandler(updateInput);
      onClickEditItem();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      setError(errorMessage);
    }
  };

  const onCancel = () => {
    setTodoTitle(todo.title);
    setTodoDescription(todo.description || "");
    setError("");
    onClickEditItem();
  };

  return (
    <div key={todo.id} className="flex flex-col gap-4 bg-slate-50">
      {error && <div className="text-red-500">{error}</div>}
      <div id="title">
        <input
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          placeholder="Enter title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div id="description" className="flex flex-row gap-4">
        <input
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          placeholder="Enter description"
          className="w-full p-2 border rounded"
        />
      </div>
      <div id="created-date" className="flex flex-row gap-4">
        <label>Created: {new Date(todo.createdAt).toLocaleString()}</label>
        <label>Updated: {new Date(todo.updatedAt).toLocaleString()}</label>
      </div>
      <div id="add-todo-button" className="flex flex-row gap-4">
        <button
          onClick={onSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItem;
