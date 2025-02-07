import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const TaskStatus = pgEnum("tasks_status", ["CREATED", "COMPLETED"])

export const TasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  status: TaskStatus().default("CREATED"),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
})

export type ITaskSelect = typeof TasksTable.$inferSelect
export type ITaskInsert = typeof TasksTable.$inferInsert
