import { signOut } from '@/auth';
import SignOutBtn from './signout-btn';

const SignOutBtnForm = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <SignOutBtn />
    </form>
  );
};

export default SignOutBtnForm;
