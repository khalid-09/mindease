'use client';

import { Comments } from '@prisma/client';
import { User } from 'next-auth';
import { useState } from 'react';
import CreateCommentForm from '../create/create-comment-form';
import { MessageSquareMore } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteComment } from '@/actions/comment';
import DeleteCommentButton from './delete-comment-btn';
import Image from 'next/image';
import Link from 'next/link';
import { convertDate } from '@/lib/utils';

interface CommentUser {
  user: {
    image: string | null;
    username: string | null;
  };
}

interface Replies {
  replies: (Comments & CommentUser)[];
}

interface CommentProps {
  comment: Comments & Partial<Replies> & CommentUser;
  sessionUser: User | undefined;
}

const Comment = ({ sessionUser, comment }: CommentProps) => {
  const { user, createdAt, content, userId, id, postId, replies } = comment;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleReply = () => setShowReplyForm(prev => !prev);

  const handleShowReply = () => setShowReplies(prev => !prev);
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={user?.image! || 'https://github.com/shadcn.png'}
            alt={'Test'}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="text-sm text-muted-foreground">@{user?.username}</div>
        <span>{convertDate(createdAt)}</span>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-1">
          {replies && replies.length > 0 ? (
            <div
              onClick={handleShowReply}
              className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground"
            >
              <MessageSquareMore className="h-4 w-4" />
              {showReplies ? 'Hide' : `${replies.length} Replies`}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquareMore className="h-4 w-4" />
              {`${replies?.length ?? 0} Replies`}
            </div>
          )}
          <Button variant="link" onClick={handleReply}>
            {showReplyForm ? 'Close' : 'Reply'}
          </Button>
        </div>
        {sessionUser?.id === userId && (
          <form action={deleteComment}>
            <input type="hidden" name="commentId" value={id} />
            <DeleteCommentButton />
          </form>
        )}
      </div>
      {showReplyForm && (
        <CreateCommentForm
          onSetShowReplyForm={setShowReplyForm}
          reply={true}
          commentId={id}
          postId={postId}
        />
      )}
      {replies &&
        showReplies &&
        replies.map(reply => (
          <div key={reply.id} className="mt-2 space-y-2 pl-6">
            <Comment comment={reply} sessionUser={sessionUser} key={reply.id} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
