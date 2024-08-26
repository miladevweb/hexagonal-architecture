import type { Request, Response, NextFunction } from 'express'
import { ServiceContainer } from '../../../../shared/infrastructure/ServiceContainer'
import { NotFoundErrorPost, UniqueTitleErrorPost } from '../../../domain/Errors'
import { PrismaPostMapper } from '../../../application/Mappers/PrismaPostMapper'

export class ExpressPostController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await ServiceContainer.post.getAll.run()
      const postsForUser = posts.map((p) => PrismaPostMapper.toClientSide(p))
      return res.json(postsForUser).status(200)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const post = await ServiceContainer.post.getById.run(id)
      const postForUser = PrismaPostMapper.toClientSide(post)
      return res.json(postForUser).status(200)
    } catch (error) {
      if (error instanceof NotFoundErrorPost) {
        console.log(error.stack)
        return res.status(404).json({ message: error.message })
      }
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body
      await ServiceContainer.post.create.run(title, description)
      return res.status(201).send()
    } catch (error) {
      if (error instanceof UniqueTitleErrorPost) {
        console.log(error.stack)
        return res.status(409).json({ message: error.message })
      }
      next(error)
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, title, description } = req.body

      if (!id) throw new Error('Id is required')

      await ServiceContainer.post.edit.run(id, title, description)
      return res.status(200).send()
    } catch (error) {
      if (error instanceof NotFoundErrorPost) {
        console.log(error.stack)
        return res.status(404).json({ message: error.message })
      }
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await ServiceContainer.post.delete.run(id)
      return res.status(200).send()
    } catch (error) {
      if (error instanceof NotFoundErrorPost) {
        console.log(error.stack)
        return res.status(404).json({ message: error.message })
      }
      next(error)
    }
  }
}
