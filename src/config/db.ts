import { drizzle } from "drizzle-orm/bun-sql"

const DATABASE_URL = process.env.DATABASE_URL ?? ""
const db = drizzle(DATABASE_URL, { casing: "snake_case" })

export default db
