import { factory } from './HonoFactory'

export const honoJSONMiddleware = factory.createMiddleware(async (c, next) => {
  await next()
  c.header('Content-Type', 'application/json')
})
