'use server';

import prisma from '@/db/db';
import { getSessionUser, toSlug } from '@/lib/utils';
import {
  createForumSchema,
  CreateForumSchema,
} from '@/lib/validation/create-forum';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createForum = async (data: CreateForumSchema) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return {
      message: 'User not found, Login or SignUp to continue!',
      reason: 'User not found',
      type: 'error',
    };

  const validatedFields = createForumSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Something went wrong, Try again later!',
      reason: validatedFields.error.errors,
      type: 'error',
    };
  }

  const { title, description, tags } = validatedFields.data;

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  await prisma.posts.create({
    data: {
      title,
      slug,
      description,
      draft: false,
      authorId: sessionUser.id,
      tags,
    },
  });

  await prisma.user.update({
    where: {
      id: sessionUser.id,
    },
    data: {
      totalPosts: {
        increment: 1,
      },
    },
  });

  revalidatePath('/forum');
  redirect('/forum');
};
