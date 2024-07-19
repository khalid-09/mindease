import SignOutBtn from '@/components/auth/sign-out-btn';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MainAppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-svh">
      <div className="flex h-full w-full">
        <aside className="border-r p-10 space-y-3 md:block hidden text-center">
          <Button asChild>
            <Link href="/forum">Forum</Link>
          </Button>
          <SignOutBtn />
        </aside>
        {children}
      </div>
    </div>
  );
};

export default MainAppLayout;
