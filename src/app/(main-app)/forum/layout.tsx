import MobileNav from '@/components/mobilenav';

const ForumLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full">
      <header className="w-full p-6 md:p-10 border-b border-l rounded-xl flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community Forum</h2>
        <div className="md:hidden block">
          <MobileNav />
        </div>
      </header>
      <section className="md:p-14 p-4">{children}</section>
    </div>
  );
};

export default ForumLayout;
