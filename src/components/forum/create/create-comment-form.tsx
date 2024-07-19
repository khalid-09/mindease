'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { commentSchema, CommentSchema } from '@/lib/validation/create-comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateCommentForm = () => {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: CommentSchema) => {
    console.log(data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-4" placeholder="Add a comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-4">
          <Button type="submit">Comment</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCommentForm;
