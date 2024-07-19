import CreateCommentForm from '@/components/forum/create/create-comment-form';
import BackButton from '@/components/forum/read/back-btn';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import prisma from '@/db/db';
import { convertDate } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Markdown from 'react-markdown';

interface ReadForumPageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const posts = await prisma.posts.findMany({
    where: {
      draft: false,
    },
    select: {
      slug: true,
    },
  });

  return posts.map(({ slug }) => ({
    slug,
  }));
};

const getPost = cache(async (slug: string) => {
  const post = await prisma.posts.findUnique({
    where: { slug },
    include: {
      author: {
        select: { image: true, username: true, name: true },
      },
    },
  });
  if (!post) notFound();
  return post;
});

export const generateMetadata = async ({
  params: { slug },
}: ReadForumPageProps): Promise<Metadata> => {
  const job = await getPost(slug);
  return {
    title: `${job.title}`,
  };
};

const ReadForumPage = async ({ params: { slug } }: ReadForumPageProps) => {
  const post = await getPost(slug);
  const { author, createdAt, title, description } = post;

  const { name, image } = author!;

  return (
    <>
      <div className="max-w-6xl m-auto w-full gap-3 flex">
        <div className="nd:block hidden">
          <BackButton />
        </div>
        <div className="w-full space-y-6">
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="relative z-10 rounded-full overflow-hidden h-12 w-12">
                  <Image
                    alt={name!}
                    src={image! || 'https://github.com/shadcn.png'}
                    className="absolute object-cover"
                    fill
                    quality={20}
                  />
                </div>
                <div>
                  <p className="text-sm">{name}</p>
                  <p className="text-sm">{convertDate(createdAt)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="text-3xl">{title}</h1>
            </CardContent>
            <CardFooter>
              {description && <Markdown>{description}</Markdown>}
            </CardFooter>
          </Card>
          <CreateCommentForm />
        </div>
      </div>
    </>
  );
};

export default ReadForumPage;
