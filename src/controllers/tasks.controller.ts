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
  return ctx.json(undefined)
})

TaskRouter.post("/", zValidator("json", CreateTaskSchema), async (ctx) => {
  return ctx.json(undefined)
})

TaskRouter.get("/:id", async (ctx) => {
  return ctx.json(undefined)
})

TaskRouter.patch("/:id", zValidator("json", UpdateTaskSchema), async (ctx) => {
  return ctx.json(undefined)
})

TaskRouter.delete("/:id", async (ctx) => {
  return
})

export default TaskRouter
