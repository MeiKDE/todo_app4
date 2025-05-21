import { Todo } from "@/types";
import { useState } from "react";
interface EditItemProps {
  todo: Todo;
}

const EditItem = ({ todo }: EditItemProps) => {
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [todoDescription, setTodoDescription] = useState<string>(
    todo.description || ""
  );

  return (
    <div key={todo.id} className="flex flex-col gap-4 bg-slate-50">
      <div id="title">
        <input
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          placeholder="Enter title"
        />
      </div>
      <div id="description" className="flex flex-row gap-4">
        <input
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          placeholder="Enter description"
        />
      </div>
      <div id="created-date" className="flex flex-row gap-4">
        <label>Created: {new Date(todo.createdAt).toLocaleString()}</label>
        <label>Updated: {new Date(todo.updatedAt).toLocaleString()}</label>
      </div>
      <div id="add-todo-button" className="flex flex-row gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
          Save
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItem;
