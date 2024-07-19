import { z } from 'zod';

export const createForumSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be 3 char. long' })
    .max(100),
  tags: z.array(z.string()),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be 10 char. long' })
    .max(5000),
});

export type CreateForumSchema = z.infer<typeof createForumSchema>;
