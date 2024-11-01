'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client'; // นำเข้า authClient
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const router = useRouter(); // นำเข้า useRouter
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true); // ตั้งค่าเริ่มต้นให้โหลดอยู่

  const checkSession = React.useCallback(async (): Promise<void> => {

    // const path = window.location.href;
    
    // console.log('path in checkSession : ',path)
    // if (path == 'http://localhost:3000/auth/sign-in') return;

    setIsLoading(true); // ตั้งค่า isLoading เป็น true ก่อนเริ่มตรวจสอบ
    try {
      const { data, error } = await authClient.getUser();
      console.log('checkSession - User data:', data);
      console.log('checkSession - Error:', error);

      if (error) {
        logger.error(error);
        setUser(null);
        setError('Something went wrong');
      } else {
        setUser(data); // อัปเดตข้อมูลผู้ใช้
        setError(null); // ลบข้อความข้อผิดพลาด
      }
    } catch (err) {
      logger.error(err);
      setUser(null);
      setError('Something went wrong');
    } finally {
      setIsLoading(false); // ตั้งค่า isLoading เป็น false หลังการตรวจสอบเสร็จสิ้น
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, [checkSession]); // เรียกใช้ checkSession เมื่อคอมโพเนนต์ถูก mount

  return (
    <UserContext.Provider value={{ user, error, isLoading, checkSession }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
