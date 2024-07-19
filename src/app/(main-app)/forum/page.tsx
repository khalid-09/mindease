import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateNewForumCard from '@/components/forum/create-new-forum-card';
import ForumCard from '@/components/forum/forum-card';
import { getSessionUser } from '@/lib/utils';
import { redirect } from 'next/navigation';
import prisma from '@/db/db';
import SearchPost from '@/components/forum/search-post';

interface ForumPageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

const ForumPage = async ({ searchParams: { query } }: ForumPageProps) => {
  const sessionUserPromise = await getSessionUser();

  const postsPromise = await prisma.posts.findMany({
    where: {
      draft: false,
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      author: true,
    },
  });

  const [sessionUser, posts] = await Promise.all([
    sessionUserPromise,
    postsPromise,
  ]);
  if (!sessionUser) redirect('/login');

  return (
    <div className="flex md:flex-row flex-col items-start gap-8 md:gap-12">
      <CreateNewForumCard />
      <div className="max-w-6xl w-full">
        <div
          id="filters"
          className="flex gap-3 items-start md:items-center md:justify-between sticky md:top-4 top-52 z-20 bg-background bg-opacity-50 backdrop-blur-md"
        >
          <Select>
            <SelectTrigger className="md:w-[180px] hidden w-1/2">
              <SelectValue placeholder="All Posts" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter Forums</SelectLabel>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="10">10 days ago</SelectItem>
                <SelectItem value="30">1 month ago</SelectItem>
                <SelectItem value="6">6 months ago</SelectItem>
                <SelectItem value="1">1 year ago</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SearchPost />
        </div>
        {posts.map(post => (
          <ForumCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="mt-10">No posts. Start Writing ✨`</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
