'use client';

import * as crypto from 'crypto';

import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

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

class AuthClient {
  // Sign up
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      // เรียกใช้ API ด้วย fetch เพื่อเพิ่มข้อมูลผู้ใช้ใหม่
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), // แปลง params เป็น JSON เพื่อส่งไปยังเซิร์ฟเวอร์
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // สร้าง token สำหรับการ Authentication
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);

      return {}; // ส่งกลับว่างเพื่อแสดงว่าสำเร็จ
    } catch (error) {
      console.error('Sign up failed:', error);
      return { error: error.message }; // ส่งกลับ error ในกรณีที่เกิดปัญหา
    }
  }

  // legendstart โค้ดเก่า
  // Sign in with password
  // async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
  //   const { username, password } = params;
  //   console.log('paramsssssssssssssssssss :', params);
  //   try {
  //     // Fetch users from the server
  //     const response = await fetch('http://localhost:3000/api/auth', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }), // แปลง params เป็น JSON เพื่อส่งไปยังเซิร์ฟเว
  //     });

  //     const users: User[] = await response.json();

  //     console.log('users in client :', users);

  //     // Find the user with the matching credentials
  //     const user = users.find((u) => u.username === username && u.password === password);

  //     if (!user) {
  //       return { error: 'Invalid credentials' };
  //     }

  //     // Generate token and store in localStorage
  //     const token = generateToken();
  //     console.log('token', token);
  //     localStorage.setItem('custom-auth-token', token);
  //     return {};
  //   } catch (error) {
  //     return { error: 'Error during authentication' };
  //   }
  // }
  // legendend
  // src/app/lib/auth.ts

  async authenticateUser(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    try {
      const response = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return { error: errorResponse.message || 'Error during authentication' };
      }

      const { token, user } = await response.json();

      // เก็บโทเค็นใน localStorage
      localStorage.setItem('custom-auth-token', token);

      console.log('Token in authenticateUser:', token);
      console.log('User data in authenticateUser:', user);

      return { error: null }; // คืนค่าความสำเร็จ
    } catch (error) {
      return { error: 'Network error or server not reachable' };
    }
  }

  // Get the current logged-in user based on token
  public async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    console.log('token in getUser:', token); // ตรวจสอบว่าโทเค็นมีอยู่
  
    if (!token) {
      return { data: null, error: 'No token found' };
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/check-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // ส่งโทเค็นใน header
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        return { data: null, error: errorResponse.error || 'Unable to fetch user data' };
      }
  
      const user = await response.json();
      return { data: user, error: null };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { error: 'Network error or server not reachable' };
    }
  }
  
  

  async getUserRole(username: string): Promise<string | null> {
    try {
      const response = await fetch(`http://localhost:3000/api/auth`, {
        // เรียกไปที่ API route ใหม่
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // ส่ง username ไปเพื่อดึงบทบาท
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.user_role || null; // สมมติว่า API ส่งกลับ user_role
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
