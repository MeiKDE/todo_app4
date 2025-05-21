import { Todo } from "@/types/index";

interface DisplayListProps {
  todo: Todo;
  onClickDisplayList: () => void;
  deleteTodoHandle: () => void;
}

const DisplayList = ({
  todo,
  onClickDisplayList,
  deleteTodoHandle,
}: DisplayListProps) => {
  return (
    <div key={todo.id} className="flex flex-col gap-4 bg-slate-50">
      <div id="title">
        <label>Title: {todo.title}</label>
      </div>
      <div id="description" className="flex flex-row gap-4">
        <label>Description: {todo.description}</label>
      </div>
      <div id="created-date" className="flex flex-row gap-4">
        <label>Created: {new Date(todo.createdAt).toLocaleString()}</label>
      </div>
      <div id="add-todo-button" className="flex flex-row gap-4">
        <button
          onClick={onClickDisplayList}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={deleteTodoHandle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DisplayList;
