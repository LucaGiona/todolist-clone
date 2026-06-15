import { SignInForm } from '@/components/auth/sign-in-form';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <CheckSquare className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold">Todoist Clone</h1>
        <p className="text-muted-foreground">Sign in to manage your tasks</p>
      </div>
      <SignInForm />
      <p className="mt-4 text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
