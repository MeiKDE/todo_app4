// Import the Neon client and configuration tools for serverless Postgres
import { neon, neonConfig } from "@neondatabase/serverless";

// Import Drizzle ORM's HTTP driver for Neon
import { drizzle } from "drizzle-orm/neon-http";

// Import Node.js-compatible WebSocket constructor (needed in serverless environments)
import ws from "ws";

// Import the database schema definitions
import * as schema from "../src/shared/schema";

// Configure Neon to use the WebSocket constructor provided by the 'ws' package
// This is necessary for environments like Node.js where WebSocket is not available globally
neonConfig.webSocketConstructor = ws;

// Ensure that the DATABASE_URL environment variable is defined
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

// Initialize a Neon SQL executor using the provided connection string
// This is the HTTP-based version optimized for serverless usage
const sql = neon(process.env.DATABASE_URL!);

// Initialize and export the Drizzle ORM client using the Neon executor and schema
// The `schema` provides typed access to tables and columns for type-safe queries
export const db = drizzle(sql, { schema });
