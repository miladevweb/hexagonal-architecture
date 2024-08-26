import { Router } from 'express'
import { createPostSchema, editPostSchema } from '../../Schemas/PostSchema'
import { ExpressPostController } from '../ExpressPostController'
import { validatePostSchema } from '../../../../shared/infrastructure/Express/Middlewares/ExpressZODMiddleware'

const controller = new ExpressPostController()
const ExpressPostRouter = Router()

ExpressPostRouter.get('/posts', controller.getAll.bind(controller))
ExpressPostRouter.get('/posts/:id', controller.getById.bind(controller))
ExpressPostRouter.post('/posts', validatePostSchema(createPostSchema), controller.create.bind(controller))
ExpressPostRouter.put('/posts', validatePostSchema(editPostSchema), controller.edit.bind(controller))
ExpressPostRouter.delete('/posts/:id', controller.delete.bind(controller))

export { ExpressPostRouter }
