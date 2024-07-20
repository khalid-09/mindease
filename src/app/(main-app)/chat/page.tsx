import Chat from '@/components/chatbot/chat';
import MobileNav from '@/components/mobilenav';
import { getSessionUser } from '@/lib/utils';
import { redirect } from 'next/navigation';

const ChatBotPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect('/login');

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
      <Chat img={sessionUser.image!} />
    </section>
  );
};

export default ChatBotPage;
