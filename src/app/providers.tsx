'use client';

import type { ReactNode } from 'react';

// Auth state is managed server-side via @/lib/auth/server.
// Client-side auth operations (sign-in, sign-up, sign-out) use server actions.
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
