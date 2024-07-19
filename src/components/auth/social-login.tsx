import { FaGoogle } from 'react-icons/fa6';
import { Button } from '../ui/button';

const SocialLogin = () => {
  return (
    <aside className="flex -translate-y-10  flex-col items-center md:-translate-y-0 md:flex-row">
      <div className="my-4 h-px w-20 bg-gray-300 md:mx-4 md:h-20 md:w-px" />
      <Button>
        <FaGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </aside>
  );
};

export default SocialLogin;
