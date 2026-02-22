import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // In a real app, verify against database (Admin model). 
        // For this MVP, we use hardcoded credentials or env vars.
        // Username: admin, Password: password123

        if (username === 'admin' && password === 'password123') {
            const cookieStore = await cookies();
            cookieStore.set('admin_token', 'valid-token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (_error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
