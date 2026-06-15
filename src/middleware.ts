import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow public auth pages
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Next.js server actions POST to the current page URL with this header — don't redirect them.
  // The server action itself will check auth via auth.getSession().
  if (req.method === 'POST' && req.headers.get('Next-Action')) {
    return NextResponse.next();
  }

  // Use Neon Auth middleware for all other routes
  return auth.middleware({ loginUrl: '/sign-in' })(req);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
