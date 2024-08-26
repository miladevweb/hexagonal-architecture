import type { PrismaClient } from '@prisma/client'
import { PrismaRepostory } from '../../../post/infrastructure/Repositories/PrismaRepository'
import { GetAllPosts } from '../../../post/application/UseCases/GetAllPosts'
import { GetByIdPost } from '../../../post/application/UseCases/GetByIdPost'
import { CreatePost } from '../../../post/application/UseCases/CreatePost'
import { EditPost } from '../../../post/application/UseCases/EditPost'
import { DeletePost } from '../../../post/application/UseCases/DeletePost'
import { IPostRepository } from '../../../post/domain/Repository/PostRepository'

// const repository = new PrismaRepostory(new PrismaClient())

// export const ServiceContainer = {
//   post: {
//     getAll: new GetAllPosts(repository),
//     getById: new GetByIdPost(repository),
//     create: new CreatePost(repository),
//     edit: new EditPost(repository),
//     delete: new DeletePost(repository),
//   },
// }

export function createServiceContainer(prismaClient: PrismaClient) {
  const repository = new PrismaRepostory(prismaClient)
  return {
    post: {
      getAll: new GetAllPosts(repository),
      getById: new GetByIdPost(repository),
      create: new CreatePost(repository),
      edit: new EditPost(repository),
      delete: new DeletePost(repository),
    },
  }
}
