import ChatbotSection from '@/components/landing/chatbot-section';
import CommunitySection from '@/components/landing/community-section';
import Footer from '@/components/landing/footer';
import HomeSection from '@/components/landing/home-section';
import Navbar from '@/components/landing/navbar';
import ReportSection from '@/components/landing/report';

const Page = () => {
  return (
    <>
      <Navbar />
      <HomeSection />
      <CommunitySection />
      <ChatbotSection />
      <ReportSection />
      <Footer />
    </>
  );
};

export default Page;
