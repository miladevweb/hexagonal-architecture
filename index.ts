import express from 'express'
import { ExpressPostRouter } from './lib/post/infrastructure/Express/ExpressPostRouter'
import { expressErrorMiddleware } from './lib/shared/infrastructure/Express/Middlewares/ExpressErrorMiddleware'

const app = express()

app.use(express.json())
app.use(ExpressPostRouter)

// Middleware for handling errors
app.use(expressErrorMiddleware)

app.listen(8000, () => console.log('SERVER_RUNNING_ON_PORT', 8000))
