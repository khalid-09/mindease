'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const SignOutBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
