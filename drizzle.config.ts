import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/*.schema.ts",
  casing: "snake_case",
  dialect: "sqlite",
  dbCredentials: {
    url: "tasks.db",
  },
})
