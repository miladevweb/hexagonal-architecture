import { z } from 'zod'

export const basePostSchema = z.object({
  id: z.string().uuid({ message: 'Invalid id ❌' }),
  title: z.string().min(5, 'The title must be at least 5 characters long').max(50, 'Stop ❌ the title must be at most 50 characters long'),
  description: z.string().min(3, 'Your description must be at least 3 characters long').max(250, 'Stop ❌ the description must be at most 250 characters long'),
})

export const createPostSchema = basePostSchema.omit({ id: true }).partial({ description: true })

export const editPostSchema = basePostSchema.partial({
  title: true,
  description: true,
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
export type EditPostSchema = z.infer<typeof editPostSchema>
