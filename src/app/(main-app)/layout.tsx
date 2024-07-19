import SignOutBtnForm from '@/components/auth/sign-out-btn-form';
import Sidebar from '@/components/sidebar';

const MainAppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-svh">
      <div className="flex h-full w-full">
        <div className="flex h-svh items-center flex-col">
          <Sidebar />
          <SignOutBtnForm />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainAppLayout;
