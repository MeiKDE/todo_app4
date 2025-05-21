import { useState } from "react";
import { TodoAddInput } from "@/types";
interface TodoFormProps {
  createTodoHandler: (todoAddInput: TodoAddInput) => void;
}

const TodoForm = ({ createTodoHandler }: TodoFormProps) => {
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // To be used by both TodoForm and TodoList components
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");

  // Add/Submit form including required field validation
  const submitTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault; //prevent page refresh
    setFormError("");

    // Validate required title field
    if (!todoTitle.trim()) {
      setFormError("Title is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createTodoHandler({
        title: todoTitle.trim(),
        description: todoDescription.trim(),
        createdAt: new Date(),
      });
    } catch {
      setFormError("Failed to create todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="todo-form" className="flex-1">
      <div id="ford-header">
        <h1 className=" border border-gray-400 text-2xl">To Do Form:</h1>
      </div>
      <form
        onSubmit={submitTodoHandler}
        className="flex flex-col gap-4 bg-slate-50"
      >
        <div id="title">
          <label>Title *</label>
          <input
            type="text"
            placeholder="Enter title here"
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
          />
        </div>
        <div id="description" className="flex flex-row gap-4">
          <label>Description</label>
          <textarea
            placeholder="Enter description here"
            rows={10}
            onChange={(e) => setTodoDescription(e.target.value)}
            value={todoDescription}
          />
        </div>
        <div id="description" className="flex flex-row gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;
