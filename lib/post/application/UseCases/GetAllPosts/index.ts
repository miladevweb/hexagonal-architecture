import type { IPostRepository } from '../../../domain/Repository/PostRepository'

export class GetAllPosts {
  constructor(private readonly repository: IPostRepository) {}

  async run() {
    return await this.repository.getAll()
  }
}
