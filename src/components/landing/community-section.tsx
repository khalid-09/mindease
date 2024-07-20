import Image from 'next/image';
import secondBg from '../../../public/secondbg.png';
import commm from '../../../public/comm.png';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const CommunitySection = () => {
  return (
    <div className=" h-svh sticky top-0 -translate-y-52">
      <Image
        src={secondBg}
        alt="Main Hero Image"
        fill
        quality={80}
        placeholder="blur"
        className="object-cover -z-20 absolute"
      />
      <div className="flex justify-center gap-20 items-center">
        <div className="relative w-[40.375rem] mt-72 h-[40.375rem]">
          <Image
            src={commm}
            alt="Community Image"
            fill
            className="object-cover z-20 absolute"
          />
        </div>
        <div className="w-[35.5rem] space-y-6 h-[12.375rem]">
          <h3 className="text-4xl">Join Our COMMUNITY FORUM</h3>
          <p>Connect, Share and Grow Together...</p>
          <p>
            In our community forum, you are never alone. Seek advice, share your
            journey, or connect with others in a safe space. Engage with a
            vibrant community that understands and supports you.
          </p>
          <p>THREDS: POSTS | REPLY | MENTIONS</p>
          <Button className="space-x-4 w-[19.938rem] h-[4.688rem] font-bold text-xl">
            <span>Ask your questions</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
