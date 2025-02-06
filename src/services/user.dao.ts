import BaseDao from "./base.dao"
import {
  UsersTable,
  type IUserSelect,
  type IUserInsert,
} from "../database/users.schema"
import { eq } from "drizzle-orm"
import { HTTPException } from "hono/http-exception"

class UserDao extends BaseDao<typeof UsersTable, IUserSelect, IUserInsert> {
  constructor() {
    super(UsersTable, UsersTable.id)
  }

  async findByEmail(email: string): Promise<IUserSelect> {
    const users = await this.findAll(eq(UsersTable.email, email))
    if (users.length === 0)
      throw new HTTPException(400, { message: "User not found" })
    return users[0]
  }
}

export default UserDao
