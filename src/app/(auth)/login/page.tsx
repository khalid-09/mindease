import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LogIn',
  description: 'Log in to your CLC account',
};

const LoginPage = () => {
  return (
    <Card className="w-full -translate-y-10 shadow-md md:w-[400px] md:-translate-y-0 md:p-4">
      <CardHeader>
        <CardTitle>LogIn</CardTitle>
        <CardDescription>to your Mindease account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <div>
          <p className="text-sm text-muted-foreground">
            New to Mindease?{' '}
            <Link className="font-semibold text-primary" href="/signup">
              Sign Up
            </Link>
          </p>
          {/* <Link href="/" className="text-sm text-muted-foreground">
            Forgot your password?
          </Link> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
