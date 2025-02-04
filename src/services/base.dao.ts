import type { PgColumn, PgTable } from "drizzle-orm/pg-core"
import { eq, type SQL } from "drizzle-orm"

import db from "../config/db"
import { HTTPException } from "hono/http-exception"

class BaseDao<ITable extends PgTable, ISelect, IInsert> {
  protected table: ITable
  protected primaryKey: PgColumn

  constructor(table: ITable, primaryKey: PgColumn) {
    this.table = table
    this.primaryKey = primaryKey
  }

  async findAll(filters?: SQL): Promise<ISelect[]> {
    let query = db.select().from(this.table)
    if (filters) {
      query = query.where(filters)
    }
    return await query
  }

  async create(data: IInsert): Promise<ISelect> {
    const [newRecord] = await db
      .insert(this.table)
      .values(data as any)
      .returning()
    return newRecord
  }

  async findById(id: number | string): Promise<ISelect | undefined> {
    const [record] = await db
      .select()
      .from(this.table)
      .where(eq(this.primaryKey, id))
      .limit(1)

    if (!record) throw new HTTPException(400, { message: "Record not found" })

    return record
  }

  async update(
    id: number | string,
    data: Partial<IInsert>,
  ): Promise<ISelect | undefined> {
    await this.findById(id)

    const [updatedRecord] = await db
      .update(this.table)
      .set(data)
      .where(eq(this.primaryKey, id))
      .returning()

    return updatedRecord
  }

  async delete(id: number | string): Promise<void> {
    await this.findById(id)
    await db.delete(this.table).where(eq(this.primaryKey, id))
    return
  }
}

export default BaseDao
