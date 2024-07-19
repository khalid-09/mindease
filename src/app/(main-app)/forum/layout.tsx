const ForumLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full">
      <header className="w-full p-8 md:p-10 border-b border-l rounded-xl ">
        <h2 className="text-2xl font-bold">Community Forum</h2>
      </header>
      <section className="md:p-14 p-4">{children}</section>
    </div>
  );
};

export default ForumLayout;
