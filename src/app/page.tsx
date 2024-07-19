import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  return (
    <>
      <section className="h-dvh">
        <ModeToggle />
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
        <Button asChild>
          <Link href="/forum">Forum</Link>
        </Button>
      </section>
    </>
  );
};

export default Page;
