import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Define the todos table schema
// pgTable → defines a table
// serial → auto-incrementing integer (like SERIAL in Postgres)
// text → a column of type TEXT
// boolean → a column of type BOOLEAN
// timestamp → a column for date/time

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  CreatedAt: timestamp("created_at").defaultNow().notNull(),
  UpdatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Export types for type safety
// You don't have to manually maintain types that match your schema.
// Prevent mismatches between your TypeScript code and actual database structure.
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
