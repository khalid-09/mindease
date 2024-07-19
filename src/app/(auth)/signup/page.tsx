import SignupForm from '@/components/auth/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for a new CLC account',
};

const SignUpPage = () => {
  return (
    <Card className="w-full -translate-y-10  shadow-md md:w-[400px] md:-translate-y-0 md:p-4">
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>new here? create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <div>
          <p className="text-sm text-muted-foreground">
            Already got an account?{' '}
            <Link className="font-semibold text-primary" href="/login">
              Log In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
