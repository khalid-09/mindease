import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string({ required_error: 'Comment is required' })
    .min(3, { message: 'Comment must be 3 char. long' })
    .max(500),
});

export type CommentSchema = z.infer<typeof commentSchema>;
