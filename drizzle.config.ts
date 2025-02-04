import { defineConfig } from "drizzle-kit"

const DATABASE_URL = process.env.DATABASE_URL || ""

export default defineConfig({
  out: "./drizzle",
  schema: "./src/*.schema.ts",
  casing: "snake_case",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
})
