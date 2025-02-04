import { Hono } from "hono"
import { serve } from "bun"

import TaskRouter from "./controllers/tasks.controller"
import handleError from "./utils/error"

const port = 3000
const app = new Hono()

app.get("/", (ctx) => {
  return ctx.text("Hello Hono!")
})

app.route("/api", TaskRouter)

app.onError(handleError)

console.info(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
