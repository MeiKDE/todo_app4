# Next.js Todo App

A beginner-friendly todo list application where you can add, view, edit, and delete tasks. This project is built with modern web technologies and stores your todos in a database so they persist even when you close your browser.

## What Can This App Do?

- ✅ Add new tasks with titles and optional descriptions
- ✅ Mark tasks as complete by checking them off
- ✅ Edit task titles and descriptions
- ✅ Delete tasks you no longer need
- ✅ All your tasks are saved in a database (they won't disappear when you refresh)
- ✅ Works well on mobile phones and desktop computers

## Technologies Used

If you're new to web development, here's a simple explanation of the technologies used:

- **Next.js**: A framework that helps build web applications easily
- **React**: A library for creating user interfaces with reusable components
- **PostgreSQL**: A powerful, open-source database that stores your todos
- **Prisma**: A tool that makes it easier to work with databases
- **Tailwind CSS**: A styling framework that makes the app look good

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (App Router pattern)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS

## Before You Start

You'll need a few things installed on your computer:

### 1. Node.js and npm

Node.js is what runs JavaScript on your computer (outside a browser). npm is a tool that comes with Node.js and helps install other software.

- Go to [Node.js website](https://nodejs.org/)
- Download the "LTS" version for macOS
- Follow the installation instructions
- When Node.js is installed, it automatically installs npm too

To check if installation worked, open your Mac's Terminal app and type:
```bash
node --version
npm --version
```
You should see version numbers in response.

### 2. PostgreSQL Database

PostgreSQL is where all your todos will be stored.

The easiest way to install PostgreSQL on a Mac is to use Postgres.app:

1. Go to [Postgres.app](https://postgresapp.com/)
2. Download and install it (drag to Applications folder)
3. Open the app from your Applications folder
4. Click "Initialize" to start PostgreSQL
5. You'll see an elephant icon in your menu bar when it's running

After installation, you should be able to access PostgreSQL.

## Getting Started

### 1. Get the code

There are two ways to get the code:

#### Option A: Using Git (recommended)

If you have Git installed on your Mac:

```bash
git clone https://github.com/yourusername/nextjs-todo-app.git
cd nextjs-todo-app
```

Not sure if you have Git? Open Terminal and type `git --version`. If it shows a version number, you have Git installed.

#### Option B: Download as a ZIP file

1. Go to the GitHub repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a folder on your Mac
5. Open Terminal
6. Navigate to the folder where you extracted the files:
   ```bash
   cd path/to/extracted/folder
   ```

> **Note**: If you're using this app from Replit, you can fork the Repl directly and skip this step.

### 2. Install the required packages

This command will download and install all the software packages that the app needs to run:

```bash
npm install
```

This might take a few minutes to complete.

### 3. Set up the database

#### Option 1: Using Local PostgreSQL (that you installed earlier)

1. First, you need to create a database for your todo app:

   1. Click on the elephant icon in your menu bar
   2. Click "Open psql"
   3. Type this command and press Enter:
      ```
      CREATE DATABASE nextjs_todo_app;
      ```
   4. Type `\q` and press Enter to exit

2. Now, you need to create a special file that tells the app how to connect to your database.

   Create a new file named `.env` in the main folder of the app:
   
   ```bash
   # In Terminal, navigate to your project folder
   touch .env
   open -e .env  # This opens the file in TextEdit
   ```
   
   Inside this file, add this line:
   ```
   DATABASE_URL="postgresql://postgres@localhost:5432/nextjs_todo_app?schema=public"
   ```
   
   > **Note:** If you set up Postgres.app with a password, your connection string should be:
   > ```
   > DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/nextjs_todo_app?schema=public"
   > ```

> **Note for Replit users**: You can skip this step! Replit automatically provides a PostgreSQL database and sets up the `DATABASE_URL` environment variable for you.

#### Option 2: Using a Cloud Database (no local installation needed)

If you prefer not to install PostgreSQL locally, you can use a free cloud database:

1. Go to [Neon](https://neon.tech/) and create a free account
2. Create a new project
3. Once created, click on the "Connection Details" tab
4. Find the "Connection String" and copy it
5. Create a file named `.env` in your project folder:
   ```bash
   # In Terminal, navigate to your project folder
   touch .env
   open -e .env  # This opens the file in TextEdit
   ```
6. Paste the connection string into the `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   ```
   (This will have your actual details already filled in from the copied connection string)

### 4. Set up the database structure

Now we need to tell the database what kind of data we want to store (todos with titles, descriptions, etc).

Run these commands in your terminal:

```bash
# This creates the tools needed to talk to the database
npx prisma generate

# This creates the necessary tables in the database
npx prisma db push
```

You might see some output, but as long as there are no red error messages, you're good to go!

**Bonus:** If you want to view and edit your database with a friendly interface, you can use Prisma Studio:

```bash
npx prisma studio
```

This will open a browser window where you can see and edit the data in your database.

### 5. Start the application

Now you're ready to start the application:

```bash
# This command starts the app
npx next dev -p 5000
```

You should see some output indicating that the app is running.

Now open your web browser and go to:
[http://localhost:5000](http://localhost:5000)

You should see the Todo app running. You can now add, edit, and delete todos!

> **Note for Replit users**: The app will automatically run on port 5000 and be accessible through the Replit webview.

**If something doesn't work:**
- Make sure PostgreSQL is running (check for the elephant icon in your menu bar)
- Check that your `.env` file has the correct database URL 
- Make sure you ran the Prisma commands in step 4
- Check for any error messages in the Terminal
- If you're having database connection issues, try restarting Postgres.app

## How the App is Organized

The app is organized into folders and files, each with a specific purpose. You don't need to understand all of this to use the app, but if you're curious:

```
src/
├── app/                   # The main parts of the app
│   ├── api/               # Code that runs on the server (not in browser)
│   │   └── todos/         # Handles todo data (creating, fetching, etc.)
│   ├── layout.tsx         # The overall page structure
│   └── page.tsx           # The main page content
├── components/            # Reusable pieces of the interface
│   ├── TodoForm.tsx       # The form for adding new todos
│   ├── TodoItem.tsx       # How each todo is displayed
│   └── TodoList.tsx       # How the list of todos is displayed
├── lib/                   # Helper code
│   └── prisma.ts          # Database connection setup
├── styles/                # CSS styling
└── types/                 # Definitions of data structures
```

## API Routes

This project uses the Next.js App Router pattern for API routes, which provides a cleaner way to define API endpoints. Each HTTP method is defined as a separate named function, making the code more maintainable and easier to understand:

### `/api/todos` Endpoints

- **GET** - Fetch all todos
  - Usage: `GET /api/todos`
  - Returns: Array of todo items

- **POST** - Create a new todo
  - Usage: `POST /api/todos`
  - Body: `{ title: string, description?: string }`
  - Returns: The created todo item

### `/api/todos/[id]` Endpoints

- **GET** - Fetch a specific todo
  - Usage: `GET /api/todos/[id]`
  - Returns: Single todo item

- **PUT** - Update a todo
  - Usage: `PUT /api/todos/[id]`
  - Body: `{ title?: string, description?: string, completed?: boolean }`
  - Returns: The updated todo item

- **DELETE** - Delete a todo
  - Usage: `DELETE /api/todos/[id]`
  - Returns: Success message

## Database Schema

The database schema is defined in `prisma/schema.prisma`:

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## TypeScript Types

The application uses the following TypeScript interfaces for type safety:

```typescript
// Todo interface - represents a todo item
export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// TodoInput - used when creating a new todo
export type TodoInput = {
  title: string;
  description?: string;
};

// TodoUpdateInput - used when updating a todo
export type TodoUpdateInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};
```

## Styling

This project uses Tailwind CSS for styling. The main configuration files are:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles/globals.css` - Global styles and Tailwind imports

## App Router vs Pages Router

This project uses the newer App Router pattern introduced in Next.js 13. Here's a comparison with the traditional Pages Router:

### App Router Benefits

1. **Cleaner API Routes**:
   - Define separate functions for each HTTP method (GET, POST, PUT, DELETE)
   - Better organization and readability
   - More maintainable code structure

2. **Route Grouping**:
   - Enhanced organization of routes with nested folders
   - Dynamic routes with parameters directly in folder names (e.g., `[id]`)

3. **Server Components by Default**:
   - Better performance with React Server Components
   - Reduced client-side JavaScript

4. **Improved Type Safety**:
   - Built-in types for request and response objects
   - Better TypeScript integration

### App Router API Route Structure

```
src/app/api/todos/route.ts         # Handles /api/todos endpoints
src/app/api/todos/[id]/route.ts    # Handles /api/todos/[id] endpoints
```

Each file exports functions named after the HTTP methods they handle:

```typescript
export async function GET() { /* ... */ }
export async function POST() { /* ... */ }
export async function PUT() { /* ... */ }
export async function DELETE() { /* ... */ }
```

## Deployment

If you want to share your Todo app with others, you can deploy it to the web:

### Deploying with Vercel (Easiest Option)

Vercel is the company that makes Next.js, and they offer free hosting for Next.js apps.

1. Create a free account at [Vercel](https://vercel.com/signup)
2. Install the Vercel CLI on your Mac:
   ```bash
   npm install -g vercel
   ```
3. In Terminal, navigate to your project folder and run:
   ```bash
   vercel login
   ```
4. Follow the authentication process, then deploy with:
   ```bash
   vercel
   ```
5. When prompted, add your `DATABASE_URL` as an environment variable

Vercel will give you a URL where your app is hosted (like https://your-app-name.vercel.app).

### Building for Production Locally

If you want to run the production version on your Mac:

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The app will be available at http://localhost:3000

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Code Examples

### API Route Example (App Router Pattern)

Here's an example of how the API routes are structured using the App Router pattern:

```typescript
// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TodoInput } from '@/types';

// GET /api/todos - Get all todos
export async function GET(request: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TodoInput;
    
    if (!data.title || data.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || null,
      }
    });
    
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
```

### Dynamic API Route Example

```typescript
// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TodoUpdateInput } from '@/types';

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = Number(params.id);
  if (isNaN(todoId)) {
    return NextResponse.json(
      { error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    const data = await request.json() as TodoUpdateInput;
    
    if (data.title !== undefined && data.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.