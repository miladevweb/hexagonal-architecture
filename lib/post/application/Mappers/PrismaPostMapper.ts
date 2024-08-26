import { Post } from '../../domain/Entity/post'
import { PostId } from '../../domain/ValueObjects/PostId'
import type { IPrismaPostDTO } from '../DTOs/PrismaPostDTO'
import { PostTitle } from '../../domain/ValueObjects/PostTitle'
import { PostDescription } from '../../domain/ValueObjects/PostDescription'
import type { IClientPostDTO } from '../DTOs/ClientPostDTO'

export class PrismaPostMapper {
  static toDomain(post: IPrismaPostDTO): Post {
    return new Post(new PostTitle(post.title), post.description ? new PostDescription(post.description) : undefined, new PostId(post.id))
  }

  static toPrisma(post: Post): IPrismaPostDTO {
    return {
      id: post.id ? post.id.value : '',
      title: post.title.value,
      description: post.description ? post.description.value : null,
    }
  }

  static toClientSide(post: Post): IClientPostDTO {
    return {
      id: post.id ? post.id.value : '',
      title: post.title.value,
      description: post.description ? post.description.value : null,
    }
  }
}
