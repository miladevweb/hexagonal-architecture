import { factory } from './HonoFactory'
import { PrismaClient } from '@prisma/client'
import { createServiceContainer } from '../../ServiceContainer'

export const HonoServiceContainerMiddleware = factory.createMiddleware(async (c, next) => {
  const prisma = c.get('prisma') as unknown as PrismaClient

  // We inject the database connection repository into the Service Container
  const ServiceContainer = createServiceContainer(prisma)
  c.set('service-container', ServiceContainer)

  await next()
})
