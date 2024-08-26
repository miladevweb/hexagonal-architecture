import { PrismaClient } from '@prisma/client'
import type { Post } from '../../../domain/Entity/post'
import { PrismaPostMapper } from '../../../application/Mappers/PrismaPostMapper'
import type { PostId } from '../../../domain/ValueObjects/PostId'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import type { PostTitle } from '../../../domain/ValueObjects/PostTitle'

// Errors are handled in Application Layer and we catch its instance in the Controller not here
export class PrismaRepostory implements IPostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async titleExists(title: PostTitle) {
    const post = await this.prisma.post.findUnique({ where: { title: title.value } })
    return !!post
  }

  async getAll() {
    const prismaPosts = await this.prisma.post.findMany()
    const posts = prismaPosts.map((p) => PrismaPostMapper.toDomain(p))
    return posts
  }

  async getById(id: PostId) {
    const post = await this.prisma.post.findUnique({ where: { id: id.value } })

    if (!post) return null
    return PrismaPostMapper.toDomain(post)
  }

  async create(post: Post) {
    const prismaPost = PrismaPostMapper.toPrisma(post)

    await this.prisma.post.create({
      data: {
        title: prismaPost.title,
        description: prismaPost.description,
      },
    })
  }

  async edit(post: Post) {
    const prismaPost = PrismaPostMapper.toPrisma(post)

    await this.prisma.post.update({
      where: { id: prismaPost.id },
      data: {
        title: prismaPost.title,
        description: prismaPost.description,
      },
    })
  }

  async delete(id: PostId) {
    await this.prisma.post.delete({ where: { id: id.value } })
  }
}
