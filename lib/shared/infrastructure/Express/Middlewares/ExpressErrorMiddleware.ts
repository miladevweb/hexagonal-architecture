import type { NextFunction, Request, Response } from 'express'

export const expressErrorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    console.log(err.stack)
    return res.status(500).json({ message: err.message })
  }

  console.error(err)
  return res.status(500).json({ message: 'Internal Server Error' })
}
