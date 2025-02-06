import { Hono } from "hono"
import { sign } from "hono/jwt"
import { zValidator } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"
import { eq } from "drizzle-orm"

import UserDao from "../services/user.dao"
import { SignInSchema, SignUpSchema } from "../database/auth.validation"
import { JWT_SECRET } from ".."
import { UsersTable } from "../database/users.schema"

const AuthRouter = new Hono()
const repo = new UserDao()

AuthRouter.post("/signup", zValidator("json", SignUpSchema), async (ctx) => {
  const body = ctx.req.valid("json")
  const oldUser = await repo.findAll(eq(UsersTable.email, body.email))
  if (oldUser.length)
    throw new HTTPException(400, { message: "User already exists" })
  const password = await Bun.password.hash(body.password)
  const user = await repo.create({
    ...body,
    password,
  })
  return ctx.json(user)
})

AuthRouter.post("/signin", zValidator("json", SignInSchema), async (ctx) => {
  const body = ctx.req.valid("json")
  const user = await repo.findByEmail(body.email)
  const isMatch = await Bun.password.verify(body.password, user.password)
  if (!isMatch) {
    return ctx.json({ message: "Invalid credentials" }, 401)
  }
  const payload = {
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  }
  const token = await sign(payload, JWT_SECRET)
  return ctx.json({ token })
})

export default AuthRouter
