import { Post } from '../../../domain/Entity/post'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import { PostTitle } from '../../../domain/ValueObjects/PostTitle'
import { PostDescription } from '../../../domain/ValueObjects/PostDescription'
import { UniqueTitleErrorPost } from '../../../domain/Errors'

export class CreatePost {
  constructor(private readonly repository: IPostRepository) {}

  async run(title: string, description?: string) {
    const titleExists = await this.repository.titleExists(new PostTitle(title))
    if(titleExists) throw new UniqueTitleErrorPost() 

    const post = new Post(new PostTitle(title), description ? new PostDescription(description) : undefined)

    await this.repository.create(post)
  }
}
