import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"

import TaskDao from "../services/task.dao"
import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "../database/tasks.validation"
import { TasksTable } from "../database/tasks.schema"
import { eq } from "drizzle-orm"
import { HTTPException } from "hono/http-exception"

const TaskRouter = new Hono().basePath("/task")
const repo = new TaskDao()

TaskRouter.get("/", async (ctx) => {
  const user = ctx.get("jwtPayload")
  const tasks = await repo.findAll(eq(TasksTable.userId, user.id))
  return ctx.json(tasks)
})

TaskRouter.post("/", zValidator("json", CreateTaskSchema), async (ctx) => {
  const user = ctx.get("jwtPayload")
  const body = ctx.req.valid("json")
  const task = await repo.create({ ...body, userId: user.id })
  return ctx.json(task)
})

TaskRouter.get("/:id", async (ctx) => {
  const id = ctx.req.param("id")
  const user = ctx.get("jwtPayload")
  const task = await repo.findById(+id)
  if (task.userId !== user.id) {
    throw new HTTPException(403, {
      message: "Forbidden",
    })
  }
  return ctx.json(task)
})

TaskRouter.patch("/:id", zValidator("json", UpdateTaskSchema), async (ctx) => {
  const id = ctx.req.param("id")
  const body = ctx.req.valid("json")
  const task = await repo.update(+id, body)
  return ctx.json(task)
})

TaskRouter.delete("/:id", async (ctx) => {
  const id = ctx.req.param("id")
  const user = ctx.get("jwtPayload")
  const task = await repo.findById(+id)
  if (task.userId !== user.id) {
    throw new HTTPException(403, {
      message: "Forbidden",
    })
  }
  await repo.delete(+id)
  return
})

export default TaskRouter
