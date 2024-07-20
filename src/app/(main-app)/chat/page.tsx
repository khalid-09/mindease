import Chat from '@/components/chatbot/chat';
import MobileNav from '@/components/mobilenav';

export const runtime = 'edge';

const ChatBotPage = () => {
  return (
    <section className="max-w-5xl space-y-6 mt-6 mx-auto w-full">
      <header className="w-full p-6 md:p-10  border rounded-xl flex items-center justify-between">
        <h2 className="text-2xl font-bold space-x-3">
          <span>🤖</span>
          <span>Chatbot</span>
        </h2>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </header>
      <Chat />
    </section>
  );
};

export default ChatBotPage;
