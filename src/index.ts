import { Hono } from "hono"
import { serve } from "bun"
import { jwt, type JwtVariables } from "hono/jwt"

import handleError from "./utils/error"

import TaskRouter from "./controllers/tasks.controller"
import UserRouter from "./controllers/users.controller"
import AuthRouter from "./controllers/auth.controller"

type IVars = JwtVariables

const port = 3000
export const JWT_SECRET = "it-is-very-secret"

const app = new Hono<{ Variables: IVars }>()

app.get("/", (ctx) => {
  return ctx.text("Hello Hono!")
})

app.route("/auth", AuthRouter)

app.use(
  "/api/*",
  jwt({
    secret: JWT_SECRET,
  }),
)

app.route("/api", TaskRouter)
app.route("/api", UserRouter)

// app.get("/ui", swaggerUI({ url: "/doc" }))

app.onError(handleError)

app.notFound((ctx) => {
  return ctx.json(
    {
      error: "Not found!",
    },
    404,
  )
})

console.info(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
