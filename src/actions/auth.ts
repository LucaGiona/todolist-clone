'use server';

import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export async function signIn(_prev: unknown, formData: FormData) {
  const { error } = await auth.signIn.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}

export async function signUp(_prev: unknown, formData: FormData) {
  const { error } = await auth.signUp.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}

export async function signOut() {
  await auth.signOut();
  redirect('/sign-in');
}
