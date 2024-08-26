import { PostId } from '../ValueObjects/PostId'
import { PostTitle } from '../ValueObjects/PostTitle'
import { PostDescription } from '../ValueObjects/PostDescription'

export class Post {
  id?: PostId
  title: PostTitle
  description?: PostDescription

  constructor(title: PostTitle, description?: PostDescription, id?: PostId) {
    this.id = id
    this.title = title
    this.description = description
  }
}
