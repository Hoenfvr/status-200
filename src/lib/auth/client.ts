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

      const response = await fetch('http://localhost:3005/users', {
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
      setCookie('token', token);  // เก็บ token ใน cookie
      setCookie('user_type', 'user');  // เก็บ user_type ใน cookie

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
      const response = await fetch('http://localhost:3005/users');
      const users: User[] = await response.json();
  
      const user = users.find((u) => u.username === username && u.password === password);
  
      if (!user) {
        return { error: 'Invalid credentials' };
      }
  
      // สร้างโทเคนใหม่
      const token = generateToken();
      setCookie('token', token);  // เก็บ token ใน cookie
      setCookie('user_type', user.user_type);  // เก็บ user_type ใน cookie
      console.log('token :', token);
  
      // อัปเดตโทเคนในฐานข้อมูลสำหรับผู้ใช้คนนี้
      const updateResponse = await fetch(`http://localhost:3005/users/${user.id}`, {
        method: 'PATCH',  // ใช้ PATCH เพื่ออัปเดตข้อมูลบางส่วน
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),  // อัปเดตเฉพาะฟิลด์ token
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to update user token');
      }
  
      return {};
    } catch (error) {
      return { error: 'Error during authentication' };
    }
  }

  // Get the current logged-in user
  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = getCookie('token');
    console.log('token in getUser :',token)
    if (!token) {
      return { data: null };
    }

    try {
      const response = await fetch('http://localhost:3005/users');
      const users: User[] = await response.json();
      console.log('users in getUser :',users)

      // หา token ใน users ที่ตรงกับ token ที่เก็บใน cookie
      const user = users.find((u) => u.token === token);
      return { data: user || null };
    } catch (error) {
      return { error: 'Unable to fetch user data' };
    }
  }

  // Get the current user's role
  getUserRole(): string | null {
    const userRole = getCookie('user_type');
    return userRole ? String(userRole) : null;
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    deleteCookie('token');
    deleteCookie('user_type');
    return {};
  }
}

export const authClient = new AuthClient();
