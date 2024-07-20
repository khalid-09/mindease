'use client';

import { cn } from '@/lib/utils';
import { BotMessageSquare, HomeIcon, MessageCircleMore } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full border-r p-4 text-center space-y-3">
      <Link
        href="/dashboard"
        className={cn(
          'p-8 flex gap-2',
          pathname === '/dashboard' && 'bg-secondary'
        )}
      >
        <HomeIcon />
        <p className="text-lg">Dashboard</p>
      </Link>
      <Link
        href="/forum"
        className={cn(
          'p-8 flex gap-2',
          pathname === '/forum' && 'bg-secondary'
        )}
      >
        <MessageCircleMore />
        <p className="text-lg">Forum</p>
      </Link>
      <Link
        href="/chat"
        className={cn('p-8 flex gap-2', pathname === '/chat' && 'bg-secondary')}
      >
        <BotMessageSquare />
        <p className="text-lg">Chatbot</p>
      </Link>
    </aside>
  );
};

export default Sidebar;
