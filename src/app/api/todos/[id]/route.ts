import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TodoAddInput, TodoUpdateInput } from "@/types/index";

// Helper function to safely parse and validate the todo ID from the route parameter
const validateTodoId = (id: string | undefined): number | null => {
  if (!id) return null;
  const todoId = Number(id);
  return isNaN(todoId) ? null : todoId;
};

//GET /api/todos/[id] - Retrieve a single todo by its ID
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    //If invalid ID, return 400 Bad Request with an error message
    return NextResponse.json(
      { error: "Backend: Invalid todo ID" },
      { status: 400 }
    );
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      // If no todo found, return 404 not found
      return NextResponse.json(
        { error: "Backend: Todo not found" },
        { status: 404 }
      );
    }

    // Return the found todo as JSON
    return NextResponse.json(todo);
  } catch (err) {
    // Catch any unexpected errors (e.g. database connection issues)
    console.error("Error fetching todos:", err);
    return NextResponse.json(
      { error: "Backend: Failed to fetch todo" },
      { status: 500 }
    );
  }
};

// PUT /api/todos/[id] - Update an existing todo
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    return NextResponse.json(
      { error: "Backend: Invalid todo ID" },
      { status: 400 }
    );
  }

  try {
    // Parse the JSON body of the request into a typed update object
    const data = (await request.json()) as TodoUpdateInput;

    //Validate title: if it's provided but empty, return 400 error
    if (data.title != undefined && data.title.trim() === "") {
      return NextResponse.json(
        {
          error: "Backend: Title cannot be empty",
        },
        { status: 400 }
      );
    }

    //Attempt to update the todo in the database
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data, //Apply updates (title, description, completed)
    });

    return NextResponse.json(updatedTodo);
  } catch (err) {
    // Log and return a 500 error on failure
    console.error("Backend: Error updating todo:", err);
    return NextResponse.json(
      { error: "Backend: Failed to update todo" },
      { status: 500 }
    );
  }
};

// DELETE /api/todos/[id] - Delete a todo item by ID
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    return NextResponse.json(
      { error: "Backend: Invalid todo ID" },
      { status: 400 }
    );
  }

  try {
    //Attempt to delete the todo from the database
    await prisma.todo.delete({ where: { id: todoId } });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log and return error if deletion fails
    console.error("Error deleting todo:", err);
    return NextResponse.json(
      { error: "Backend: Failed to delete todo" },
      { status: 500 }
    );
  }
};
