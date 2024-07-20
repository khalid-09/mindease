'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { SendHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: 'system',
          content: 'You are an assistant that gives short answers.',
        },
      ],
      onResponse: response => {
        if (!response.ok) {
          toast.error(error?.message || 'Something went wrong!');
        }
      },
    });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <section className="py-24 text-zinc-700">
      <div className="container max-w-5xl">
        {/* Chat area */}
        <div className="mx-auto mt-3 w-full max-w-5xl">
          <ScrollArea
            className="mb-2 h-[400px] rounded-md border p-4"
            ref={ref}
          >
            {messages.map(m => (
              <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
                {m.role === 'user' && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="text-sm">U</AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5">
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-zinc-500">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-emerald-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5 w-full">
                      <div className="mt-2 text-sm text-zinc-500">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={onSubmit} className="relative">
            <Input
              name="message"
              value={input}
              onChange={handleInputChange}
              placeholder={'Ask me anything...'}
              className="pr-12 placeholder:italic text-white focus-visible:ring-zinc-500"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className="h-5 w-5 text-emerald-500" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
