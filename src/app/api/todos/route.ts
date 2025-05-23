import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// type definition for input when creating a new todo
import { TodoAddInput } from "@/types/index";

// -----------------------------------------------------
// GET /api/todos - Retrieve all todo items
// -----------------------------------------------------

export const GET = async (request: NextRequest) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });

    //Return todos as JSON response (200 OK by default)
    return NextResponse.json(todos);
  } catch (err) {
    //Log the error to the server console for debugging
    console.error("Backend: Error fetching todos:", err);

    //Return a JSON error message with a 500 Internal Server Error Status
    return NextResponse.json(
      { error: "Backend: Failed to fetch todos" },
      { status: 500 }
    );
  }
};

// -----------------------------------------------------
// POST /api/todos - Create a new todo item
// -----------------------------------------------------

export const POST = async (request: NextRequest) => {
  try {
    // get data from request.json()
    const data = (await request.json()) as TodoAddInput;

    // Validate that the title is provided and not just whitespace
    if (!data.title || data.title.trim() === "") {
      // respond with a 400 Bad Request and an error message
      return NextResponse.json(
        { error: "Backend: Title is required" },
        { status: 400 }
      );
    }

    // Create a new todo in the database using Prisma
    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || null,
      },
    });

    //Return the newly created todo with a 201 Created status
    return NextResponse.json(todo, { status: 201 });
  } catch (err) {
    //Log the error for debugging purposes
    console.error("Backend: Error creating todo:", err);

    //Return a 500 Server Error with an error message
    return NextResponse.json(
      { error: "Backend: Failed to create todo" },
      { status: 500 }
    );
  }
};
