'use client';

import * as React from 'react';

import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
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

  const checkSession = async () => {
    const token = localStorage.getItem('custom-auth-token');
    
    if (!token) {
      console.error('No token provided');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/check-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Invalid token');
      }
  
      const user = await response.json();
      // จัดการข้อมูลผู้ใช้ที่ได้รับ
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    checkSession();
  }, []);
  
  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
