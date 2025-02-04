import { type z, ZodError } from "zod"
import { createMiddleware } from "hono/factory"

export const validate = (schema: z.ZodSchema) =>
  createMiddleware(async (ctx, next) => {
    try {
      const data = await ctx.req.json()
      schema.parse(data)
      await next()
    } catch (err) {
      if (err instanceof ZodError) {
        return ctx.json({ error: err.errors }, 400)
      }
      return ctx.json({ error: "Invalid request data" }, 400)
    }
  })
