// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // ตรวจสอบว่ามี token หรือไม่
    const token = req.cookies.get('token');

    // หากไม่มี token และพยายามเข้าถึงหน้า admin หรือหน้า user ให้ redirect ไปที่หน้า login
    if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
        return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    // ตรวจสอบประเภทของผู้ใช้ (เช่น admin หรือ user)
    const userType = req.cookies.get('user_type'); 

    // กำหนดการเข้าถึงสำหรับ user ธรรมดา (ห้ามเข้าถึง admin page)
    if (userType?.value === 'user' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/error', req.url));
    }

    return NextResponse.next();
}

// ระบุเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
