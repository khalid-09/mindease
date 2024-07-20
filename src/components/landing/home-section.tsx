import { Button } from '@/components/ui/button';
import Image from 'next/image';
import mainBg from '../../../public/mainbg.png';
import { ArrowRight } from 'lucide-react';

const HomeSection = () => {
  return (
    <div className="p-10 ">
      <h1 className="md:mt-[4.4rem] translate-x-20 md:translate-x-0 mt-4 text-center uppercase w-full text-2xl md:text-6xl font-semibold">
        Mental Health Support: AI
      </h1>
      <div className="flex items-center w-full justify-center">
        <div className="flex items-center md:flex-row flex-col gap-4 mt-10">
          <div className="w-[13.5rem] md:block hidden h-[18.563rem]">
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
              className="bg-[#109E96] w-[13.063rem] space-x-3 h-[3.75rem]"
              size="lg"
            >
              <span>Take a Quiz</span>
              <ArrowRight />
            </Button>
            <p className="md:w-[12.75rem] w-full md:h-[3.75rem] text-muted-foreground  text-xs">
              * This quiz is just for you and your results are completely
              private. No-one but you has access to your results, so be honest
              and don’t hold back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
