import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import chatbotImage from '../../../public/bot2.png'; // Replace with your chatbot image
import backgroundImage from '../../../public/box.png'; // Replace with your background hexagon image

const ChatbotSection = () => {
  return (
    <div className="relative flex items-center justify-between h-svh p-16">
      <Image
        src={backgroundImage}
        alt="Background Hexagon"
        fill
        quality={80}
        placeholder="blur"
        className="absolute object-cover -z-20"
      />
      <div className="flex-1">
        <h2 className="text-4xl font-bold">
          Meet Our <span className="text-[#109E96]">AI Chatbot</span>
        </h2>
        <h3 className="text-2xl font-bold mt-4">
          Your Personal Mental Health Assistant
        </h3>
        <p className="mt-4 text-xl font-bold">
          Our AI chatbot is here to provide you with personalized support and
          guidance whenever you need it. Whether you have a question, need a
          recommendation, or just want someone to talk to, our AI chatbot is
          available 24/7 to assist you.
        </p>
        <Button className="bg-[#109E96] text-white font-bold space-x-3 mt-6 w-[13.125rem] h-[4.688rem]">
          <span className="text-xl">Ask AI</span>
          <ArrowRight />
        </Button>
      </div>
      <div className="flex-1 relative w-[51.625rem] h-[51.625rem]">
        <Image
          src={chatbotImage}
          alt="Chatbot"
          fill
          className="object-cover z-20"
        />
      </div>
    </div>
  );
};

export default ChatbotSection;
