import { factory } from './HonoFactory'
import { ZodError, ZodType } from 'zod'

export const honoZODMiddleware = (schema: ZodType) =>
  factory.createMiddleware(async (c, next) => {
    try {
      const body = await c.req.json()
      schema.parse(body)
      await next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error, '😀😀😀')
        return c.json(
          error.errors.map((err) => {
            const path = err.path[0]
            const message = err.message
            return { [path]: message }
          }),
        )
      }
    }
  })
