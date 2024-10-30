'use client';

import type { User } from '@/types/user';

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

  // Sign in with password
  // Sign in with password
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;
    console.log('paramsssssssssssssssssss :', params);
    try {
      // Fetch users from the server
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // แปลง params เป็น JSON เพื่อส่งไปยังเซิร์ฟเว
      });

      const users: User[] = await response.json();

      console.log('users in client :', users);

      // Find the user with the matching credentials
      const user = users.find((u) => u.username === username && u.password === password);

      if (!user) {
        return { error: 'Invalid credentials' };
      }

      // Generate token and store in localStorage
      const token = generateToken();
      console.log('token', token);
      localStorage.setItem('custom-auth-token', token);
      return {};
    } catch (error) {
      return { error: 'Error during authentication' };
    }
  }

  // Get the current logged-in user based on token
  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      // Fetch users from the server
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET', // กำหนด method เป็น GET
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const users: User[] = await response.json();

      // For simplicity, assume the first user matches (or extend logic to map tokens to users)
      const user = users[0]; // You might implement token-user mapping

      return { data: user || null };
    } catch (error) {
      return { error: 'Unable to fetch user data' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
