import type { Post } from '../../../domain/Entity/post'
import type { IPostRepository } from '../../../domain/Repository/PostRepository'
import type { PostId } from '../../../domain/ValueObjects/PostId'
import type { PostTitle } from '../../../domain/ValueObjects/PostTitle'

export class PostgresRepository implements IPostRepository {
  constructor(private readonly dabaseUrl: string) {}

  create(post: Post): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getAll(): Promise<Post[]> {
    throw new Error('Method not implemented.')
  }

  getById(id: PostId): Promise<Post | null> {
    throw new Error('Method not implemented.')
  }

  delete(id: PostId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  edit(post: Post): Promise<void> {
    throw new Error('Method not implemented.')
  }

  titleExists(title: PostTitle): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
