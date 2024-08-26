export class NotFoundErrorPost extends Error {
  name = 'NotFoundErrorPost'
  message = 'Post not found ❌❌❌'
}

export class UniqueTitleErrorPost extends Error {
  name = 'UniqueTitleErrorPost'
  message = 'Title already exists'
}
