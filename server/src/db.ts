import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is missing!");
}

export const pool = new Pool({
  connectionString,
  // Enable SSL connection for Supabase databases
  ssl: connectionString?.includes("localhost") || connectionString?.includes("127.0.0.1")
    ? false
    : { rejectUnauthorized: false }
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
