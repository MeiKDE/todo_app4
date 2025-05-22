"use client";
import React, { useState } from "react";
import { TodoAddInput } from "@/types";
import { formStyles, inputStyles, buttonStyles } from "@/styles/common";
import { create } from "domain";
import TodoList from "./TodoList";

interface TodoFormProps {
  createTodo: (todoAddInput: TodoAddInput) => void;
}

const TodoForm = ({ createTodo }: TodoFormProps) => {
  const [formError, setFormError] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitTodo = async () => {
    setFormError("");
    try {
      if (!todoTitle.trim()) {
        setFormError("Title is required");
        return;
      }
      await createTodo({
        title: todoTitle.trim(),
        description: todoDescription.trim(),
        createdAt: new Date(),
      });
      setIsSubmitting(true);
    } catch (err) {
      setFormError("Failed to create todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="todo-form" className="flex-1">
      <div id="form-header">
        <h1 className="text-2xl font-bold mb-4">To Do Form:</h1>
      </div>
      {formError && <div className={formStyles.error}>{formError}</div>}
      <form onSubmit={submitTodo} className={formStyles.container}>
        <div className={formStyles.field}>
          <label className={formStyles.label}>Title *</label>
          <input
            type="text"
            placeholder="Enter title here"
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
            className={`${inputStyles.base} ${
              formError ? inputStyles.error : ""
            }`}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label}>Description</label>
          <textarea
            placeholder="Enter description here"
            rows={10}
            onChange={(e) => setTodoDescription(e.target.value)}
            value={todoDescription}
            className={inputStyles.base}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`${buttonStyles.primary} ${
              isSubmitting ? buttonStyles.disabled : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;
