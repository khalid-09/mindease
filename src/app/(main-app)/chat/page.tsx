import { Card, CardContent } from '@/components/ui/card';

const ChatBotPage = () => {
  return (
    <section className="max-w-5xl space-y-6 mt-6 mx-auto w-full">
      <header className="w-full p-6 md:p-10  border rounded-xl ">
        <h2 className="text-2xl font-bold space-x-3">
          <span>🤖</span>
          <span>Chatbot</span>
        </h2>
      </header>
      <Card>
        <CardContent></CardContent>
      </Card>
    </section>
  );
};

export default ChatBotPage;
