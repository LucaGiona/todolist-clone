import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock server-only modules that can't run in jsdom
vi.mock('@/db', () => ({
  db: {
    query: { todos: { findMany: vi.fn() }, tags: { findMany: vi.fn() } },
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    select: vi.fn(),
  },
}));

vi.mock('@/lib/auth/server', () => ({
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } }),
    signIn: { email: vi.fn() },
    signUp: { email: vi.fn() },
    signOut: vi.fn(),
    handler: vi.fn(),
    middleware: vi.fn(),
  },
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}));
