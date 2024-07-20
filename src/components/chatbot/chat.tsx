'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontalIcon, Loader2 } from 'lucide-react'; // Import Loader2 for the spinner
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  image: string;
}

export default function Chat({ image }: ChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-24 ">
      <div className="container max-w-5xl">
        <div className="mx-auto mt-3 w-full max-w-5xl">
          <ScrollArea
            className="h-[400px] rounded-md border overflow-y-auto p-4"
            ref={scrollAreaRef}
          >
            <div className="pr-4">
              {messages.map((m, index) => (
                <div key={index} className="mb-6">
                  {m.role === 'user' && (
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage
                          src={image || 'https://github.com/shadcn.png'}
                        />
                        <AvatarFallback className="text-sm">U</AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5">
                        <p className="font-semibold">You</p>
                        <div className="mt-1.5 text-sm">{m.content}</div>
                      </div>
                    </div>
                  )}

                  {m.role === 'assistant' && (
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-emerald-500 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5 w-full">
                        <div className="mt-2 text-sm">{m.content}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="relative mt-4">
            <Input
              name="message"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={'Ask me anything...'}
              className="pr-12 placeholder:italic focus-visible:ring-zinc-500"
              disabled={isLoading}
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontalIcon className="h-5 w-5 text-emerald-500" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
