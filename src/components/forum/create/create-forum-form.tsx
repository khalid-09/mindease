'use client';

import { Button } from '@/components/ui/button';
import {
  createForumSchema,
  CreateForumSchema,
} from '@/lib/validation/create-forum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import dynamic from 'next/dynamic';
// import RichTextEditor from './rich-text-editor';

const CreateForumForm = () => {
  const form = useForm<CreateForumSchema>({
    resolver: zodResolver(createForumSchema),
    defaultValues: {
      title: '',
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

  const onSubmit = async (data: CreateForumSchema) => {
    console.log(data);
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
          <Button type="submit">Post</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForumForm;
