const MainAppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-svh">
      <div className="flex h-full w-full">
        <aside className="border-r p-10 md:block hidden text-center">
          <></>
        </aside>
        {children}
      </div>
    </div>
  );
};

export default MainAppLayout;
