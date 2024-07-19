import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import CreateNewForumCard from '@/components/forum/create-new-forum-card';
import ForumCard from '@/components/forum/forum-card';
import { getSessionUser } from '@/lib/utils';
import { redirect } from 'next/navigation';
import prisma from '@/db/db';

const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect('/login');

  const posts = await prisma.posts.findMany({
    where: {
      draft: false,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      author: true,
    },
  });

  console.log(posts.length);

  return (
    <div className="flex md:flex-row flex-col items-start gap-8 md:gap-12">
      <CreateNewForumCard />
      <div className="max-w-6xl w-full">
        <div
          id="filters"
          className="flex gap-3 items-start md:items-center md:justify-between sticky md:top-4 top-52 z-20 bg-background bg-opacity-50 backdrop-blur-md"
        >
          <Select>
            <SelectTrigger className="md:w-[180px] w-1/2">
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
          <div className="relative">
            <Input className="md:w-48 w-full px-7" placeholder="Search.." />
            <span>
              <MagnifyingGlassIcon className="absolute top-[10px] left-2 " />
            </span>
          </div>
        </div>
        {posts.map(post => (
          <ForumCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Page;
