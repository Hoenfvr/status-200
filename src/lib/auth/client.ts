'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import type { User } from '@/types/user';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

class AuthClient {
  // Sign up function
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const userData = {
        ...params,
        user_type: 'user', // กำหนด user_type เป็น 'user' โดยค่าเริ่มต้น
      };

      const response = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const token = generateToken();
      setCookie('token', token); // เก็บ token ใน cookie
      setCookie('user_type', 'user'); // เก็บ user_type ใน cookie

      return {};
    } catch (error) {
      console.error('Sign up failed:', error);
      return { error: error.message };
    }
  }

  // Sign in with password
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    try {
      // ส่งคำขอไปยัง API เพื่อเข้าสู่ระบบ
      const response = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST', // ใช้ POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // ส่ง username และ password
      });

      // ตรวจสอบสถานะการตอบกลับ
      if (!response.ok) {
        const errorResponse = await response.json();
        return { error: errorResponse.error || 'Invalid credentials' }; // ส่งกลับข้อผิดพลาด
      }

      const result = await response.json(); // รับข้อมูลที่ตอบกลับจากเซิร์ฟเวอร์
      const user = result.user; // สมมติว่าผลลัพธ์มีโครงสร้างที่ประกอบด้วย user

      // สร้างโทเคนใหม่
      const token = generateToken();
      setCookie('token', token); // เก็บ token ใน cookie
      setCookie('user_type', user.user_role); // เก็บ user_type ใน cookie

      console.log('token:', token);

      // อัปเดตโทเคนในฐานข้อมูลสำหรับผู้ใช้คนนี้
      const updateResponse = await fetch(`http://localhost:3000/api/auth/update-token`, {
        method: 'POST', // ใช้ PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, token }), // ส่ง username และ token ใน body
      });
      

      if (!updateResponse.ok) {
        throw new Error('Failed to update user token');
      }

      return {}; // ส่งกลับว่างเพื่อแสดงว่าสำเร็จ
    } catch (error) {
      console.error('Error during authentication:', error);
      return { error: 'Error during authentication' };
    }
}


  // Get the current logged-in user
  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = getCookie('token'); // ดึงโทเค็นจาก cookie
    console.log('token in getUser:', token);
  
    if (!token) {
      return { data: null };
    }
  
    try {
      // ส่งคำขอ POST ไปยัง API check-token
      const response = await fetch('http://localhost:3000/api/auth/get-user', {
        method: 'POST', // ใช้ POST
        headers: {
          'Authorization': `Bearer ${token}`, // แนบโทเค็นใน Authorization header
          'Content-Type': 'application/json',
        },
      });
  
      // ตรวจสอบสถานะการตอบกลับ
      if (!response.ok) {
        const errorResponse = await response.json();
        return { data: null, error: errorResponse.error || 'Unable to fetch user data' };
      }
  
      // ดึงข้อมูลผู้ใช้จากการตอบกลับ
      const user = await response.json();
      console.log('user in getUser after API call:', user);
  
      return { data: user, error: null };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { error: 'Unable to fetch user data' };
    }
  }

  // Get the current user's role
  getUserRole(): string | null {
    const userRole = getCookie('user_type');
    console.log(`userRole in getUserRole() :`,userRole)
    console.log(`All cookie :`,document.cookie); // แสดงค่าคุกกี้ทั้งหมด

    return userRole ? String(userRole) : null;
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    deleteCookie('token');
    deleteCookie('user_type');
    localStorage.removeItem('custom-auth-token'); // ลบโทเค็นจาก local storage
    return {};
  }
}

export const authClient = new AuthClient();
