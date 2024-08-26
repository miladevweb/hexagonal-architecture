import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'

export const validatePostSchema = (schema: z.ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error, '😀😀😀')
      return res.status(400).json(
        error.errors.map((err) => {
          const path = err.path[0]
          const message = err.message
          return { [path]: message }
        }),
      )
    }
  }
}
