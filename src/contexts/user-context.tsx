'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

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
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    // const pathname = usePathname()
    const path = window.location.href;
    
    console.log('path in checkSession : ',path)
    if (path == 'http://localhost:3000/auth/sign-in') return;

    const { data, error } = await authClient.getUser();

    console.log(`data in checkSession : `, data);
    console.log(`error in checkSession : `, error);

    if (error) {
      logger.error('Error fetching user data:', error); // เพิ่มข้อความเพื่อบันทึกข้อผิดพลาดให้ชัดเจน
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
      return;
    }

    setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, [checkSession]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
