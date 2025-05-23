import { useState } from "react";
import { TodoAddInput } from "@/types";

interface TodoFormProps {
  createTodo: (todoAddInput: TodoAddInput) => Promise<void>;
}

const TodoForm = ({ createTodo }: TodoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const validateAndCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      //Set states
      setIsLoading(true);
      setError("");

      //Check field input(s)
      if (!title.trim()) {
        setError("Title field is required.");
        return;
      }

      await createTodo({
        title: title,
        description: description,
      });

      // Clear form on success
      setTitle("");
      setDescription("");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error has occurred while creating todo.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="form-section" className=" w-96 h-[600px]">
      <h1 className="text-2xl text-center">Todo Form:</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={validateAndCreateTodo} className="bg-white h=full gap-4">
        <div id="title-input">
          <label> Title *</label>
          <input
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div id="description-input">
          <label> Description - optional</label>
          <textarea
            placeholder="Enter description"
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-300 justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default TodoForm;
