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

const MotionLink = motion(Link);

const ForumCard = () => {
  return (
    <MotionLink
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8 }}
      href="/forum/asdjfa"
    >
      <Card className="mt-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative z-10 rounded-full overflow-hidden h-6 w-6">
                <Image
                  alt="Shad Mirza"
                  src="https://github.com/shadcn.png"
                  className="absolute object-cover"
                  fill
                  // placeholder="blur"
                  quality={20}
                />
              </div>
              <p className="text-sm">Nikul Patel</p>
            </div>
            <p className="text-sm">2 days ago.</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3>Forum Title</h3>
        </CardContent>
        <CardFooter>
          <Badge>Anxiety</Badge>
        </CardFooter>
      </Card>
    </MotionLink>
  );
};

export default ForumCard;
