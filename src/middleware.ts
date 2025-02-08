import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api')) {

    const hostname = process.env.HOST

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('host', hostname)

    let url = request.nextUrl.clone()
    // url.protocol = 'https'
    url.hostname = hostname
    url.port = process.env.HOSTPORT
    url.pathname = url.pathname.replace(/^\/api/, '');

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    })
  }
}


export const config = {
  // Skip all paths that should not be internationalized
  // matcher: ['/((?!_next|.*\\..*).*)']

  /**
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - iot-api
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|assets/images|favicon.ico).*)',
  ],
};


// export const config = {
//   matcher: '/api/:path*',
// }