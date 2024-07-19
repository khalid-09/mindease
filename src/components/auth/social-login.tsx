import { signIn } from '@/auth';
import GoogleBtn from './google-button';

const SocialLogin = () => {
  return (
    <aside className="flex -translate-y-10  flex-col items-center md:-translate-y-0 md:flex-row">
      <div className="my-4 h-px w-20 bg-gray-300 md:mx-4 md:h-20 md:w-px" />
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/dashboard' });
        }}
      >
        <GoogleBtn />
      </form>
    </aside>
  );
};

export default SocialLogin;
