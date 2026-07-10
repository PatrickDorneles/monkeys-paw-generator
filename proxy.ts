import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { ratelimit } from './lib/ratelimit';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function handleRateLimit(request: NextRequest) {
  // Use the user's IP as the identifier
  // In Vercel/Edge, request.ip is available. Fallback to headers for other environments.
  const ip = (request as unknown as { ip: string }).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { 
        story: "The paw is exhausted. Its malevolence is spent. It will not grant another wish until the stars align... (Rate limit exceeded)", 
        status: "ERROR" 
      }, 
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    );
  }

  return null;
}

const i18nMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Only apply rate limiting to the wish API
  if (request.nextUrl.pathname.startsWith('/api/wish')) {
    const rateLimitResponse = await handleRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;
  }

  return i18nMiddleware(request);
}

export const config = {
  // Match all pathnames except for static files and internal Next.js routes
  matcher: ['/', '/(en|pt)/:path*', '/api/wish', '/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
