import type { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import type { HTTPResponseError } from "hono/types"

const handleError = (err: Error | HTTPResponseError, ctx: Context) => {
  if (err instanceof HTTPException) {
    return ctx.json(
      {
        error: err.message,
      },
      err.status,
    )
  }

  return ctx.json(
    {
      error: "Something went wrong!",
    },
    500,
  )
}

export default handleError
