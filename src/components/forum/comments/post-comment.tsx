import prisma from '@/db/db';
import { getSessionUser } from '@/lib/utils';
import Comment from './comment';

interface PostCommentProps {
  postId: string;
}

const PostComment = async ({ postId }: PostCommentProps) => {
  const sessionUserPromise = getSessionUser();

  const commentsPromise = prisma.comments.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
      replies: {
        include: {
          user: { select: { username: true, image: true } },
          replies: {
            include: { user: { select: { username: true, image: true } } },
          },
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  const [sessionUser, comments] = await Promise.all([
    sessionUserPromise,
    commentsPromise,
  ]);

  console.log(comments);

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} sessionUser={sessionUser} />
      ))}
      {comments.length === 0 && (
        <div className="text-center text-xl text-muted-foreground">
          No Comments Yet!
        </div>
      )}
    </div>
  );
};

export default PostComment;
