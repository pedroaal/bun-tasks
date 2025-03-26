import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const TasksTable = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  status: text({ enum: ["CREATED", "COMPLETED"] })
    .notNull()
    .default("CREATED"),
})

export type ITaskSelect = typeof TasksTable.$inferSelect
export type ITaskInsert = typeof TasksTable.$inferInsert
