import { factory } from './HonoFactory'
import { getPrisma } from '../../Databases/Prisma/prismaFunction'
import { HonoContext } from '../type'

export const HonoPrismaMiddleware = factory.createMiddleware(async (c: HonoContext, next) => {
  const databaseUrl = c.env.DATABASE_URL

  try {
    if (!databaseUrl) throw new Error('DATABASE_URL is not defined')
    const prisma = getPrisma(databaseUrl)
    c.set('prisma', prisma)
    await next()
  } catch (error) {
    if (error instanceof Error) {
      await getPrisma(databaseUrl).$disconnect()
      c.json({ error: error.message }, 500)
    }
  }
})
