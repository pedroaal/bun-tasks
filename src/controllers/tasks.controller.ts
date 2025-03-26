import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"

import TaskDao from "../services/task.dao"
import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "../database/tasks.validation"

const TaskRouter = new Hono().basePath("/task")
const repo = new TaskDao()

// https://hono.dev/docs/api/routing
// https://github.com/honojs/middleware/tree/main/packages/zod-validator

TaskRouter.get("/", async (ctx) => {
  return ctx.json({})
})

TaskRouter.post("/", zValidator("json", CreateTaskSchema), async (ctx) => {
  return ctx.json({})
})

TaskRouter.get("/:id", async (ctx) => {
  return ctx.json({})
})

TaskRouter.patch("/:id", zValidator("json", UpdateTaskSchema), async (ctx) => {
  return ctx.json({})
})

TaskRouter.delete("/:id", async (ctx) => {
  return ctx.json({})
})

export default TaskRouter
