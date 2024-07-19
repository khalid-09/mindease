'use client';

import { SignupSchema, signupSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { signupUser } from '@/actions/auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { reset, control, handleSubmit } = form;

  const onSubmit = (data: SignupSchema) => {
    startTransition(() =>
      signupUser(data).then(data => {
        if (data.type === 'error') {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
      })
    );
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...field}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className="rounded-full border p-2"
                        onClick={() => setShowPassword(value => !value)}
                      >
                        {showPassword ? (
                          <EyeNoneIcon className="h-5 w-5" />
                        ) : (
                          <EyeOpenIcon className="h-5 w-5" />
                        )}
                      </TooltipTrigger>
                      {!showPassword && (
                        <TooltipContent>
                          <p>Show Password</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2">
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
