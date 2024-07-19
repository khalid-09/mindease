'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Posts, User } from '@prisma/client';
import { convertDate } from '@/lib/utils';

const MotionLink = motion(Link);

interface Author {
  author: User | null;
}

interface ForumCardProps {
  post: Posts & Author;
}

const ForumCard = ({ post }: ForumCardProps) => {
  const { tags, title, author, createdAt, slug } = post;
  const { name, image } = author!;

  return (
    <MotionLink
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8 }}
      href={`/forum/${slug}`}
    >
      <Card className="mt-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative z-10 rounded-full overflow-hidden h-6 w-6">
                <Image
                  alt={name!}
                  src={image! || 'https://github.com/shadcn.png'}
                  className="absolute object-cover"
                  fill
                  quality={20}
                />
              </div>
              <p className="text-sm">{name}</p>
            </div>
            <p className="text-sm">{convertDate(createdAt)}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3>{title}</h3>
        </CardContent>
        <CardFooter>
          <Badge>{tags.at(0)}</Badge>
        </CardFooter>
      </Card>
    </MotionLink>
  );
};

export default ForumCard;
