import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL || "";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/*.schema.ts",
  casing: "snake_case",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});

// https://orm.drizzle.team/docs/get-started/bun-sqlite-new
