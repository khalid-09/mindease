import { getSessionUser } from '@/lib/utils';

const Page = async () => {
  const sessionUser = await getSessionUser();
  console.log(sessionUser);

  return <div>DashboardPage</div>;
};

export default Page;
