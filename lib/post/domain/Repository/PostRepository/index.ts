import type { Post } from '../../Entity/post'
import type { PostId } from '../../ValueObjects/PostId'
import type { PostTitle } from '../../ValueObjects/PostTitle'

export interface IPostRepository {
  getAll(): Promise<Post[]>
  getById(id: PostId): Promise<Post | null>
  create(post: Post): Promise<void>
  edit(post: Post): Promise<void>
  delete(id: PostId): Promise<void>
  titleExists(title: PostTitle): Promise<boolean>
}
