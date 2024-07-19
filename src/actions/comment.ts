'use server';

import prisma from '@/db/db';
import { getSessionUser } from '@/lib/utils';
import { commentSchema, CommentSchema } from '@/lib/validation/create-comment';
import { revalidatePath } from 'next/cache';

export const addComment = async (postId: string, data: CommentSchema) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return { type: 'error', message: 'Login to Comment on a Post!' };

  const validatedComment = commentSchema.safeParse(data);

  if (!validatedComment.success) {
    return { type: 'error', message: 'Invalid Comment!' };
  }

  const { comment } = validatedComment.data;

  await prisma.comments.create({
    data: {
      postId,
      userId: sessionUser.id!,
      content: comment,
      parentId: null,
    },
  }); // Add a parent comment

  await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      totalComments: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/forum/${postId}`, 'page');

  return { type: 'success', message: 'Comment Added!' };
};

const deleteCommentsRecursive = async (id: string) => {
  const childComments = await prisma.comments.findMany({
    where: {
      parentId: id,
    },
  }); // Find all child comments

  for (const childComment of childComments) {
    await deleteCommentsRecursive(childComment.id);
  } // Recursively delete all child comments

  await prisma.comments.delete({
    where: {
      id: id,
    },
  });
}; // Delete the comment itself

export const deleteComment = async (formData: FormData) => {
  const commentId = formData.get('commentId') as string;

  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error('Login to Delete a Comment!');

  const comment = await prisma.comments.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.parentId === null) {
    await prisma.posts.update({
      where: {
        id: comment.postId,
      },
      data: {
        totalComments: {
          decrement: 1,
        },
      },
    });
  } // If it's a parent comment, decrement the totalComments count

  await deleteCommentsRecursive(commentId);

  revalidatePath('/forum/[slug]', 'page');
};

export const addReply = async (
  postId: string,
  commentId: string,
  data: CommentSchema
) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return { type: 'error', message: 'Login to Comment on a Post!' };

  const validatedComment = commentSchema.safeParse(data);

  if (!validatedComment.success) {
    return { type: 'error', message: 'Invalid Comment!' };
  }

  const { comment } = validatedComment.data;

  await prisma.comments.create({
    data: {
      content: comment,
      userId: sessionUser.id!,
      postId,
      parentId: commentId,
    },
  }); // Add a reply for a parent comment

  revalidatePath('/forum/[slug]', 'page');

  return { type: 'success', message: 'Reply Added!' };
};
