import { sqliteTable } from "drizzle-orm/sqlite-core"

// https://orm.drizzle.team/docs/column-types/sqlite
// id, title, description, status: "CREATED" | "COMPLETED"

// crear schema
// generar migracion $ bun generate
// migrar tabla $ bun migrate

export const TasksTable = sqliteTable("tasks", {})

export type ITaskSelect = typeof TasksTable.$inferSelect
export type ITaskInsert = typeof TasksTable.$inferInsert
