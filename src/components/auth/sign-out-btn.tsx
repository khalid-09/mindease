import { signOut } from '@/auth';
import { Button } from '../ui/button';

const SignOutBtn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="md:block hidden"
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOutBtn;
