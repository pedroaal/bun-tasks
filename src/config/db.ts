import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("tasks.db");
export const db = drizzle(sqlite, { casing: "snake_case" });

export default db;
