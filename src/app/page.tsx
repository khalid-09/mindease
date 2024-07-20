'use client';

import ChatbotSection from '@/components/landing/chatbot-section';
import CommunitySection from '@/components/landing/community-section';
import Footer from '@/components/landing/footer';
import HeroPage from '@/components/landing/hero-page';
import ReportSection from '@/components/landing/report';
import { useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

const Page = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);

      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div ref={container} className="relative h-[200svh]">
      <HeroPage scrollYProgress={scrollYProgress} />
      <CommunitySection />
      <ChatbotSection />
      <ReportSection />
      <Footer />
    </div>
  );
};

export default Page;
