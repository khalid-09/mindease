import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string({ required_error: 'Comment is required' })
    .min(5, { message: 'Comment should be atleast 5 characters long' })
    .max(200, { message: 'Comment should be atmost 200 characters long' }),
});

export type CommentSchema = z.infer<typeof commentSchema>;
