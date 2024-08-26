import { Hono } from 'hono'
import { PrismaPostMapper } from '../../../application/Mappers/PrismaPostMapper'
import { createPostSchema, editPostSchema } from '../../Schemas/PostSchema'
import { NotFoundErrorPost, UniqueTitleErrorPost } from '../../../domain/Errors'
import { honoZODMiddleware } from '../../../../shared/infrastructure/Hono/Middlewares/HonoZODMiddleware'

// Hono doesn't allow Controllers
const app = new Hono().basePath('/posts')

app.get('/', async (c) => {
  const ServiceContainer = c.get('service-container')

  try {
    const posts = await ServiceContainer.post.getAll.run()
    const postsForUser = posts.map((p) => PrismaPostMapper.toClientSide(p))
    return c.json(postsForUser, 200)
  } catch (error) {
    console.log(error, 'ERROR_CATCH')
    throw error
  }
})

app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const ServiceContainer = c.get('service-container')

  try {
    const post = await ServiceContainer.post.getById.run(id)
    const postForUser = PrismaPostMapper.toClientSide(post)
    return c.json(postForUser, 200)
  } catch (error) {
    if (error instanceof NotFoundErrorPost) {
      console.log(error.stack, 'ERROR_STACK')
      return c.json({ message: error.message }, 404)
    }
    console.log(error, 'ERROR_CATCH')
    throw error
  }
})

app.post('/', honoZODMiddleware(createPostSchema), async (c) => {
  const { title, description } = await c.req.json()
  const ServiceContainer = c.get('service-container')

  try {
    await ServiceContainer.post.create.run(title, description)
    return c.json(null, 200)
  } catch (error) {
    if (error instanceof UniqueTitleErrorPost) {
      console.log(error.stack, 'ERROR_STACK')
      return c.json({ message: error.message }, 409)
    }

    console.log(error, 'ERROR_CATCH')
    throw error
  }
})

app.put('/', honoZODMiddleware(editPostSchema), async (c) => {
  const { id, title, description } = await c.req.json()
  const ServiceContainer = c.get('service-container')

  try {
    if (!id) throw new Error('ID is required')
    await ServiceContainer.post.edit.run(id, title, description)
    return c.json(null, 200)
  } catch (error) {
    if (error instanceof NotFoundErrorPost) {
      console.log(error, 'ERROR_STACK')
      return c.json({ message: error.message }, 404)
    }

    console.log(error, 'ERROR_CATCH')
    throw error
  }
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const ServiceContainer = c.get('service-container')

  try {
    await ServiceContainer.post.delete.run(id)
    return c.json(null, 200)
  } catch (error) {
    if (error instanceof NotFoundErrorPost) {
      console.log(error.stack, 'ERROR_STACK')
      return c.json({ message: error.message }, 404)
    }

    console.log(error, 'ERROR_CATCH')
    throw error
  }
})

export default app
