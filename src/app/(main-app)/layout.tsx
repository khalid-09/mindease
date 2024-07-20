import SignOutBtnForm from '@/components/auth/sign-out-btn-form';
import Sidebar from '@/components/sidebar';

const MainAppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex">
      <div className=" flex-col h-screen md:flex hidden">
        <Sidebar />
        <div className="mt-auto flex justify-center border-l p-8 ">
          <SignOutBtnForm />
        </div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default MainAppLayout;
