import { NextRequest, NextResponse } from "next/server"; // Import Next.js types for request and response handling
import prisma from "@/lib/prisma"; // Import the Prisma client to interact with the database
import { TodoUpdateInput } from "@/types"; // Type for allowed fields when updating a todo

// Helper function to safely parse and validate the todo ID from the route parameter
function validateTodoId(id: string | undefined): number | null {
  if (!id) return null; // If no ID is provided, return null
  const todoId = Number(id); // Convert the ID string to a number
  return isNaN(todoId) ? null : todoId; // Return null if not a valid number; otherwise return the numeric ID
}

// GET /api/todos/[id] - Retrieve a single todo by its ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Destructure the dynamic route parameter from the context
) {
  const todoId = validateTodoId(params.id); // Validate the ID from the route
  if (todoId === null) {
    // If invalid ID, return 400 Bad Request with an error message
    return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  try {
    // Query the database for a todo with the given ID
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      // If no todo found, return 404 Not Found
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Return the found todo as JSON
    return NextResponse.json(todo);
  } catch (err) {
    // Catch any unexpected errors (e.g. database connection issues)
    console.error("Error fetching todo:", err);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id] - Update an existing todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = validateTodoId(params.id); // Validate the ID
  if (todoId === null) {
    return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  try {
    // Parse the JSON body of the request into a typed update object
    const data = (await request.json()) as TodoUpdateInput;

    // Validate title: if it's provided but empty, return 400 error
    if (data.title != undefined && data.title.trim() === "") {
      return NextResponse.json(
        { error: "Title cannot be empty" },
        { status: 400 }
      );
    }

    // Attempt to update the todo in the database
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId }, // Find todo by ID
      data, // Apply updates (title, description, completed)
    });

    // Return the updated todo
    return NextResponse.json(updatedTodo);
  } catch (err) {
    // Log and return a 500 error on failure
    console.error("Error updating todo:", err);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo item by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = validateTodoId(params.id); // Validate the ID
  if (todoId === null) {
    return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  try {
    // Attempt to delete the todo from the database
    await prisma.todo.delete({ where: { id: todoId } });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (err) {
    // Log and return error if deletion fails
    console.error("Error deleting todo:", err);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
