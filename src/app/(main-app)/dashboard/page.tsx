import { Chart } from '@/components/dashboard/chart';
import { Chart2 } from '@/components/dashboard/chart2';
import DateCalander from '@/components/dashboard/date-calander';
import { MoodChart } from '@/components/dashboard/mood-chart';
import Quote from '@/components/dashboard/quote';
import Sleep from '@/components/dashboard/sleep';
import MobileNav from '@/components/mobilenav';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSessionUser } from '@/lib/utils';
import { redirect } from 'next/navigation';

const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect('/login');

  return (
    <div className="w-full mb-10">
      <header className="w-full p-6 md:p-10  border-b border-l rounded-xl flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hi, {sessionUser.name} 👋</h2>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </header>
      <section className="space-y-4 flex md:flex-row flex-col gap-4 py-4 px-8">
        <div className="space-y-6 w-full">
          <div className="space-y-3 w-full">
            <p className="text-muted-foreground">Your daily quote ✨</p>
            <Quote />
          </div>
          <MoodChart />
        </div>
        <div className="flex">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Log your mood.</CardTitle>
              <CardDescription>Select a date to log your mood.</CardDescription>
            </CardHeader>
            <CardContent>
              <DateCalander />
            </CardContent>
          </Card>
        </div>
      </section>
      <div className="flex md:flex-row flex-col gap-4 px-8">
        <Sleep />
        <Chart2 />
        <Chart />
      </div>
    </div>
  );
};

export default Page;
