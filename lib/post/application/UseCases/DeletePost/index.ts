import { PostId } from '../../../domain/ValueObjects/PostId'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import { NotFoundErrorPost } from '../../../domain/Errors'

export class DeletePost {
  constructor(private readonly repository: IPostRepository) {}

  async run(id: string) {
    const postId = new PostId(id)
    const postExists = await this.repository.getById(postId)

    if (!postExists) throw new NotFoundErrorPost()

    await this.repository.delete(postId)
  }
}
