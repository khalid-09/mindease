import { getSessionUser } from '@/lib/utils';
import { redirect } from 'next/navigation';

const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect('/login');

  return <div>DashboardPage</div>;
};

export default Page;
