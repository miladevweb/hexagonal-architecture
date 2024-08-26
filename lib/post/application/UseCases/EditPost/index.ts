import { Post } from '../../../domain/Entity/post'
import { PostId } from '../../../domain/ValueObjects/PostId'
import { PostTitle } from '../../../domain/ValueObjects/PostTitle'
import { PostDescription } from '../../../domain/ValueObjects/PostDescription'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import { NotFoundErrorPost } from '../../../domain/Errors'

export class EditPost {
  constructor(private readonly repository: IPostRepository) {}

  async run(id: string, title: string, description: string) {
    const postExists = await this.repository.getById(new PostId(id))

    if (!postExists) throw new NotFoundErrorPost()

    const post = new Post(new PostTitle(title), new PostDescription(description), new PostId(id))
    await this.repository.edit(post)
  }
}
