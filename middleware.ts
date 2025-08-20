import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Paths that don't require verification
const publicPaths = [
  '/auth/auth/login',
  '/auth/verify',
  '/auth/onboarding',
  '/auth/verification-success',
  '/api/auth/verify',
  '/api/auth/send-verification'
];

// Paths that should be excluded from middleware entirely
const excludedPaths = [
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/static',
  '/images',
  '/public'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for excluded paths
  if (excludedPaths.some(prefix => path.startsWith(prefix))) {
    return NextResponse.next();
  }
  
  // Allow access to public paths without verification
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }
  
  // Check for session cookie
  const sessionToken = request.cookies.get('next-auth.session-token')?.value || 
                      request.cookies.get('__Secure-next-auth.session-token')?.value;
  
  // If no session token, redirect to login
  if (!sessionToken) {
    const url = new URL('/auth/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Check if user is verified by making a request to the check-verification API endpoint
  try {
    const verificationCheckResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/check-verification`, 
      {
        headers: {
          Cookie: request.headers.get('cookie') || ''
        }
      }
    );
    
    const data = await verificationCheckResponse.json();
    
    // If not verified, redirect to verification page
    if (!data.verified) {
      return NextResponse.redirect(new URL('/auth/verify', request.url));
    }
    
    // User is authenticated and verified, proceed
    return NextResponse.next();
  } catch (error) {
    // If there's an error checking verification status, redirect to login
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api/auth/[^/]+|_next/static|_next/image|favicon.ico).*)'
  ],
};
