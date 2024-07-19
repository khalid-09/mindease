'use client';

import { Button } from '@/components/ui/button';
import {
  createForumSchema,
  CreateForumSchema,
} from '@/lib/validation/create-forum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useState, useTransition } from 'react';

const RichTextEditor = dynamic(() => import('./rich-text-editor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { draftToMarkdown } from 'markdown-draft-js';
import { Label } from '@/components/ui/label';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { createForum } from '@/actions/forum';
import { Loader2 } from 'lucide-react';

const CreateForumForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateForumSchema>({
    resolver: zodResolver(createForumSchema),
    defaultValues: {
      title: '',
      tags: [],
      description: '',
    },
  });

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting },
    reset,
  } = form;

  const [newTag, setNewTag] = useState('');

  const handleAddTag = (
    field: ControllerRenderProps<
      {
        title: string;
        tags: string[];
        description: string;
      },
      'tags'
    >
  ) => {
    if (newTag.trim() !== '' && !field.value.includes(newTag.trim())) {
      field.onChange([...field.value, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (
    tag: string,
    field: ControllerRenderProps<
      {
        title: string;
        tags: string[];
        description: string;
      },
      'tags'
    >
  ) => {
    field.onChange(field.value.filter((t: string) => t !== tag));
  };

  const onSubmit = async (data: CreateForumSchema) => {
    startTransition(async () => {
      await createForum(data);
    });
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="relative mt-2 rounded-sm bg-muted px-3 py-3">
                  <Input
                    disabled={isSubmitting}
                    className="mb-2 bg-background px-2 py-6 text-base"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleAddTag(field)}
                    className="absolute right-4 top-[18px]"
                  >
                    Enter
                  </Button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-background px-3 py-1 text-sm font-semibold text-muted-foreground transition"
                      >
                        {tag}{' '}
                        <CrossCircledIcon
                          onClick={() => handleRemoveTag(tag, field)}
                          className="h-5 w-5 text-primary"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus('description')}>Description</Label>
              <FormControl>
                <RichTextEditor
                  ref={field.ref}
                  onChange={draft => field.onChange(draftToMarkdown(draft))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForumForm;
