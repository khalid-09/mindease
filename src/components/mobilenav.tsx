import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { getSessionUser } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const MobileNav = async () => {
  const sessionUser = await getSessionUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 relative rounded-full overflow-hidden">
                <Image
                  src={sessionUser?.image || 'https://github.com/shadcn.png'}
                  alt={sessionUser?.name || 'User'}
                  fill
                  className="object-cover absolute"
                />
              </div>
              <p>{sessionUser?.name!}</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ul className="space-y-4 mt-12">
          <li className="cursor-pointer">
            <Link href="/dashboard">〰️ Dashboard</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/forum">🔗 Forum</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/chat">🤖 Chat</Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
