import { Todo } from "@/types/index";
import { formStyles, buttonStyles } from "@/styles/common";

interface DisplayListProps {
  todo: Todo;
  enterEditMode: () => void;
  onDelete: () => void;
}

const DisplayList = ({ todo, enterEditMode, onDelete }: DisplayListProps) => {
  return (
    <div className={formStyles.container}>
      <div className={formStyles.field}>
        <label className={formStyles.label}>Title</label>
        <p className="text-gray-800">{todo.title}</p>
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label}>Description</label>
        <p className="text-gray-800">{todo.description}</p>
      </div>
      <div className="text-sm text-gray-600">
        <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={enterEditMode} className={buttonStyles.primary}>
          Edit
        </button>
        <button onClick={onDelete} className={buttonStyles.danger}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DisplayList;
