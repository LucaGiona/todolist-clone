'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { tags } from '@/db/schema';
import { auth } from '@/lib/auth/server';
import { eq, and } from 'drizzle-orm';
import type { Tag } from '@/db/schema';

async function requireUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error('Unauthorized');
  return session.user;
}

export async function getTags(): Promise<Tag[]> {
  const user = await requireUser();
  return db.select().from(tags).where(eq(tags.userId, user.id)).orderBy(tags.name);
}

export async function createTag(formData: FormData) {
  const user = await requireUser();
  const name = (formData.get('name') as string)?.trim();
  const color = (formData.get('color') as string) || '#6366f1';

  if (!name) return { error: 'Name is required' };

  await db.insert(tags).values({ userId: user.id, name, color });
  revalidatePath('/');
  revalidatePath('/tags');
  return { success: true };
}

export async function updateTag(id: string, formData: FormData) {
  const user = await requireUser();
  const name = (formData.get('name') as string)?.trim();
  const color = (formData.get('color') as string) || '#6366f1';

  if (!name) return { error: 'Name is required' };

  await db
    .update(tags)
    .set({ name, color })
    .where(and(eq(tags.id, id), eq(tags.userId, user.id)));

  revalidatePath('/');
  revalidatePath('/tags');
  return { success: true };
}

export async function deleteTag(id: string) {
  const user = await requireUser();
  await db.delete(tags).where(and(eq(tags.id, id), eq(tags.userId, user.id)));
  revalidatePath('/');
  revalidatePath('/tags');
}
