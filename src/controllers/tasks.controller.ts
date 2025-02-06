import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"

import TaskDao from "../services/task.dao"
import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "../database/tasks.validation"

const TaskRouter = new Hono().basePath("/task")
const repo = new TaskDao()

TaskRouter.get("/", async (ctx) => {
  const tasks = await repo.findAll()
  return ctx.json(tasks)
})

TaskRouter.post("/", zValidator("json", CreateTaskSchema), async (ctx) => {
  const body = ctx.req.valid("json")
  const task = await repo.create(body)
  return ctx.json(task)
})

TaskRouter.get("/:id", async (ctx) => {
  const id = ctx.req.param("id")
  const task = await repo.findById(+id)
  if (!task) return ctx.notFound()
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
  await repo.delete(+id)
  return
})

export default TaskRouter
