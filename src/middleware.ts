import { NextRequest, NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/api')) {

  //   const hostname = process.env.HOST

  //   const requestHeaders = new Headers(request.headers)
  //   requestHeaders.set('host', hostname)

  //   let url = request.nextUrl.clone()
  //   // url.protocol = 'https'
  //   url.hostname = hostname
  //   url.port = process.env.HOSTPORT
  //   url.pathname = url.pathname.replace(/^\/api/, '');

  //   return NextResponse.rewrite(url, {
  //     headers: requestHeaders,
  //   })
  // }
  
  // 认证授权
  // const requestHeaders = request.headers;
  // if (requestHeaders.get('x-forwarded-proto') === 'http') {
  //   // 获取不到Authorization，就跳转到login
  // }
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
    '/mozillaPdfjs/:path',
    
  ],
};


// export function middleware(request: NextRequest) {
//   // 1. Authentication Check
//   const token = request.cookies.get('auth-token')
//   const protectedRoutes = ['/dashboard', '/profile', '/settings']
  
//   if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
//     if (!token) {
//       // Redirect unauthenticated users to login page
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }

//   // 2. Geolocation-based Routing
//   const country = request.geo?.country
//   if (country === 'US') {
//     // Specific handling for US visitors
//     // You might want to redirect or modify the response
//   }

//   // 3. Rate Limiting (basic example)
//   const rateLimitKey = request.ip ?? 'unknown'
//   const requestCount = parseInt(request.cookies.get(`rate-limit-${rateLimitKey}`)?.value ?? '0')
  
//   if (requestCount > 100) {
//     // Block if too many requests
//     return new NextResponse(null, { 
//       status: 429, 
//       headers: { 'Content-Type': 'text/plain' } 
//     })
//   }

//   // 4. Headers Modification
//   const response = NextResponse.next()
//   response.headers.set('X-Custom-Header', 'Middleware-Processed')

//   // 5. Logging (in a real-world scenario, use a proper logging service)
//   console.log(`Request to ${request.nextUrl.pathname} from ${request.ip}`)

//   return response
// }