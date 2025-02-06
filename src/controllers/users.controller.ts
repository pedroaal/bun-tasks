import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"

import UserDao from "../services/user.dao"
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../database/users.validation"
import { UserDto } from "../database/user.dto"

const UserRouter = new Hono().basePath("/user")
const repo = new UserDao()

UserRouter.get("/", async (ctx) => {
  const users = await repo.findAll()
  return ctx.json(users)
})

UserRouter.get("/me", async (ctx) => {
  const jwtDecoded = ctx.get("jwtPayload")
  const user = await repo.findById(jwtDecoded.id)
  return ctx.json(UserDto(user))
})

UserRouter.post("/", zValidator("json", CreateUserSchema), async (ctx) => {
  const body = ctx.req.valid("json")
  const user = await repo.create(body)
  return ctx.json(user)
})

UserRouter.get("/:id", async (ctx) => {
  const id = ctx.req.param("id")
  const user = await repo.findById(+id)
  if (!user) return ctx.notFound()
  return ctx.json(user)
})

UserRouter.patch("/:id", zValidator("json", UpdateUserSchema), async (ctx) => {
  const id = ctx.req.param("id")
  const body = ctx.req.valid("json")
  const user = await repo.update(+id, body)
  return ctx.json(user)
})

UserRouter.delete("/:id", async (ctx) => {
  const id = ctx.req.param("id")
  await repo.delete(+id)
  return
})

export default UserRouter
