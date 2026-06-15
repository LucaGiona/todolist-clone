import { SignUpForm } from '@/components/auth/sign-up-form';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <CheckSquare className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold">Todoist Clone</h1>
        <p className="text-muted-foreground">Create an account to get started</p>
      </div>
      <SignUpForm />
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
