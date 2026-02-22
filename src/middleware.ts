import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const adminToken = request.cookies.get('admin_token')
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!adminToken && !isLoginPage) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        if (adminToken && isLoginPage) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
