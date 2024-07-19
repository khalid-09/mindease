import { signOut } from '@/auth';
import { Button } from '../ui/button';
import SignOutBtn from './signout-btn';

const SignOutBtnForm = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="md:block hidden"
    >
      <SignOutBtn />
    </form>
  );
};

export default SignOutBtnForm;
