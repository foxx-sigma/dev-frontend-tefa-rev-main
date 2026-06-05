import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/sign-in', '/sign-up'];

// Define asset and api prefixes that should bypass the middleware check
const isAssetOrApi = (path: string) => {
  return (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.') // like .png, .ico, .svg
  );
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass static assets and api routes
  if (isAssetOrApi(pathname)) {
    return NextResponse.next();
  }

  // Check if it's a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check for our simulated authentication token
  const hasToken = request.cookies.has('accessToken');

  // If the user is trying to access a protected route without a token
  if (!isPublicRoute && !hasToken) {
    // Redirect them to the sign-in page
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  // Allow public routes to be accessed normally even with a token
  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except _next static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
