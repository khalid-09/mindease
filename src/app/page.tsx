import Navbar from '@/components/landing/navbar';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import mainBg from '../../public/mainbg.png';
import { ArrowRight } from 'lucide-react';

const Page = () => {
  return (
    <>
      <Navbar />
      <h1 className="mt-[8.375rem] uppercase w-full text-center text-6xl font-semibold">
        Mental Health Support: AI
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4 mt-10">
          <div className="w-[13.5rem] h-[18.563rem]">
            <p className="font-bold">
              Take a short test to learn about your inner child’s needs, purpose
              in life and coping mechanisms. Receive a plan & grounding tools to
              manage self-sabotage, silence inner critic and negativity.
            </p>
          </div>
          <div className="relative h-[39.438rem] w-[46.75rem]">
            <Image
              src={mainBg}
              fill
              alt="Main Bg"
              placeholder="blur"
              className="object-cover absolute"
            />
          </div>
          <div className="space-y-[1.063rem]">
            <p className="w-[15.5rem] h-[5.063rem] font-bold">
              Check your{' '}
              <span className="text-[#109E96]"> mental health score</span> by
              taking this short quiz
            </p>
            <Button
              className="bg-[#109E96] w-[13.063rem] h-[3.75rem]"
              size="lg"
            >
              <span>Take a Quiz</span>
              <ArrowRight />
            </Button>
            <p className="w-[12.75rem] h-[3.75rem] text-muted-foreground  text-xs">
              * This quiz is just for you and your results are completely
              private. No-one but you has access to your results, so be honest
              and don’t hold back.
            </p>
          </div>
        </div>
        s
      </div>
      <ModeToggle />
    </>
  );
};

export default Page;
