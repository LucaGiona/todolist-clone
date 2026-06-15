'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { todos, todoTags, tags } from '@/db/schema';
import { auth } from '@/lib/auth/server';
import { eq, and, inArray } from 'drizzle-orm';
import type { TodoWithTags } from '@/db/schema';

async function requireUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error('Unauthorized');
  return session.user;
}

export async function getTodos(): Promise<TodoWithTags[]> {
  const user = await requireUser();

  const rows = await db.query.todos.findMany({
    where: eq(todos.userId, user.id),
    with: {
      todoTags: {
        with: { tag: true },
      },
    },
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });

  return rows.map((row) => ({
    ...row,
    tags: row.todoTags.map((tt) => tt.tag),
  }));
}

export async function createTodo(formData: FormData) {
  const user = await requireUser();
  const title = (formData.get('title') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const tagIds = formData.getAll('tagIds') as string[];

  if (!title) return { error: 'Title is required' };

  const [todo] = await db
    .insert(todos)
    .values({ userId: user.id, title, description })
    .returning();

  if (tagIds.length > 0) {
    await db.insert(todoTags).values(tagIds.map((tagId) => ({ todoId: todo.id, tagId })));
  }

  revalidatePath('/');
  return { success: true };
}

export async function updateTodo(id: string, formData: FormData) {
  const user = await requireUser();
  const title = (formData.get('title') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const tagIds = formData.getAll('tagIds') as string[];

  if (!title) return { error: 'Title is required' };

  await db
    .update(todos)
    .set({ title, description, updatedAt: new Date() })
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

  await db.delete(todoTags).where(eq(todoTags.todoId, id));

  if (tagIds.length > 0) {
    await db.insert(todoTags).values(tagIds.map((tagId) => ({ todoId: id, tagId })));
  }

  revalidatePath('/');
  return { success: true };
}

export async function deleteTodo(id: string) {
  const user = await requireUser();
  await db.delete(todos).where(and(eq(todos.id, id), eq(todos.userId, user.id)));
  revalidatePath('/');
}

export async function toggleTodo(id: string) {
  const user = await requireUser();
  const [todo] = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

  if (!todo) return;

  await db
    .update(todos)
    .set({ completed: !todo.completed, updatedAt: new Date() })
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

  revalidatePath('/');
}

export async function getTodosByTag(tagId: string): Promise<TodoWithTags[]> {
  const user = await requireUser();

  const matchingTodoIds = await db
    .select({ todoId: todoTags.todoId })
    .from(todoTags)
    .where(eq(todoTags.tagId, tagId));

  if (matchingTodoIds.length === 0) return [];

  const ids = matchingTodoIds.map((r) => r.todoId);

  const rows = await db.query.todos.findMany({
    where: and(eq(todos.userId, user.id), inArray(todos.id, ids)),
    with: {
      todoTags: {
        with: { tag: true },
      },
    },
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });

  return rows.map((row) => ({
    ...row,
    tags: row.todoTags.map((tt) => tt.tag),
  }));
}
