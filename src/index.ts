import { serve } from "bun";
import { Hono } from "hono";

import handleError from "./utils/error";

import TaskRouter from "./controllers/tasks.controller";

const port = 3000;

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.text("Hello Hono!");
});

app.route("/api", TaskRouter);

app.onError(handleError);

app.notFound((ctx) => {
  return ctx.json(
    {
      error: "Not found!",
    },
    404
  );
});

console.info(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
