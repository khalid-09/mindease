import SocialLogin from '@/components/auth/social-login';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex md:flex-row flex-col p-4 h-svh items-center justify-center">
      {children}
      <SocialLogin />
    </section>
  );
};

export default AuthLayout;
