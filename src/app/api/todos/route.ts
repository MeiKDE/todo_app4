// Import necessary types from Next.js for handling API requests and responses
import { NextRequest, NextResponse } from "next/server";

// Import the Prisma client instance to interact with the database
import prisma from "@/lib/prisma";

// Import the type definition for input when creating a new todo
import { TodoAddInput } from "@/types";

// -----------------------------------------------------
// GET /api/todos - Retrieve all todo items
// -----------------------------------------------------
export async function GET(request: NextRequest) {
  try {
    // Query the database to get all todos
    // Sorted in descending order by creation time (newest first)
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Return the list of todos as a JSON response (200 OK by default)
    return NextResponse.json(todos);
  } catch (err) {
    // Log the error to the server console for debugging
    console.error("Error fetching todos:", err);

    // Return a JSON error message with a 500 Internal Server Error status
    return NextResponse.json({ err: "Failed to fetch todos" }, { status: 500 });
  }
}

// -----------------------------------------------------
// POST /api/todos - Create a new todo item
// -----------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON and cast it to the TodoInput type
    const data = (await request.json()) as TodoAddInput;

    // Validate that the title is provided and not just whitespace
    if (!data.title || data.title.trim() === "") {
      // If invalid, respond with a 400 Bad Request and an error message
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Create a new todo in the database using Prisma
    const todo = await prisma.todo.create({
      data: {
        title: data.title, // Required title
        description: data.description || null, // Optional description (convert undefined to null)
      },
    });

    // Return the newly created todo with a 201 Created status
    return NextResponse.json(todo, { status: 201 });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error creating todo:", err);

    // Return a 500 Internal Server Error with an error message
    return NextResponse.json({ err: "Failed to create todo" }, { status: 500 });
  }
}
