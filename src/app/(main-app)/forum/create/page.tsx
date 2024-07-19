import CreateForumForm from '@/components/forum/create/create-forum-form';

const CreateForumPage = () => {
  return (
    <div className="max-w-3xl space-y-6 mx-auto">
      <h2 className="font-semibold text-xl">Create a Post</h2>
      <CreateForumForm />
    </div>
  );
};

export default CreateForumPage;
