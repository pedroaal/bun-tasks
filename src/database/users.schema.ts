import { integer, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core"

export const UsersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: text().notNull(),
  password: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
})

export type IUserSelect = typeof UsersTable.$inferSelect
export type IUserInsert = typeof UsersTable.$inferInsert
