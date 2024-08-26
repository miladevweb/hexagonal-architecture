import { factory } from './HonoFactory'

export const honoErrorMiddleware = factory.createMiddleware(async (c, next) => {
  try {
    return await next()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack, '❎❎❎')
      return c.json({ message: error.message }, 500)
    }

    console.log(error, '❌❌❌')
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})
