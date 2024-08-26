import { PostId } from '../../../domain/ValueObjects/PostId'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import { NotFoundErrorPost } from '../../../domain/Errors'

export class GetByIdPost {
  constructor(private readonly repository: IPostRepository) {}

  async run(id: string) {
    const post = await this.repository.getById(new PostId(id))
    if (!post) throw new NotFoundErrorPost()
    return post
  }
}
