import { Context } from 'hono'
import type { IPrismaClient } from '../Databases/Prisma/prismaFunction'
import type { GetAllPosts } from '../../../post/application/UseCases/GetAllPosts'
import type { GetByIdPost } from '../../../post/application/UseCases/GetByIdPost'
import type { CreatePost } from '../../../post/application/UseCases/CreatePost'
import type { EditPost } from '../../../post/application/UseCases/EditPost'
import type { DeletePost } from '../../../post/application/UseCases/DeletePost'

declare module 'hono' {
  interface ContextVariableMap {
    prisma: IPrismaClient

    'service-container': {
      post: {
        getAll: GetAllPosts
        getById: GetByIdPost
        create: CreatePost
        edit: EditPost
        delete: DeletePost
      }
    }
  }
}

export type Bindings = {
  DATABASE_URL: string
  DIRECT_URL: string
}

export type HonoContext = Context<{ Bindings: Bindings }>
