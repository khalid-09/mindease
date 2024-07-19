'use client';

import { addComment, addReply } from '@/actions/comment';
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
import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateCommentFormProps {
  postId: string;
  commentId?: string;
  reply?: boolean;
  onSetShowReplyForm?: Dispatch<SetStateAction<boolean>>;
}

const CreateCommentForm = ({
  postId,
  commentId,
  reply,
  onSetShowReplyForm,
}: CreateCommentFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: CommentSchema) => {
    if (reply) {
      startTransition(async () => {
        const { type, message } = await addReply(postId, commentId!, data);
        if (type === 'error') {
          toast.error(message);
          return;
        }
        toast.success(message);
      });
      onSetShowReplyForm!(prev => !prev);
      return;
    }

    startTransition(async () => {
      const { type, message } = await addComment(postId, data);
      if (type === 'error') {
        toast.error(message);
        return;
      }
      toast.success(message);
    });
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
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Comment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCommentForm;
