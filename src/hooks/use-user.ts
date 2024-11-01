import * as React from 'react';

import type { UserContextValue } from '@/contexts/user-context';
import { UserContext } from '@/contexts/user-context';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, error, isLoading, checkSession } = context;

  // สร้างฟังก์ชันให้เรียกใช้การตรวจสอบเซสชันเมื่อจำเป็น
  const refreshSession = async () => {
    await checkSession?.();
  };

  return { user, error, isLoading, refreshSession };
}
