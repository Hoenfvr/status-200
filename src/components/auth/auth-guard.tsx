'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  // ตรวจสอบสิทธิ์และเปลี่ยนหน้า
  const checkPermissions = React.useCallback(async (): Promise<void> => {
    // ถ้ายังโหลดอยู่ ก็ไม่ต้องทำอะไร
    if (isLoading) {
      return;
    }

    // ถ้าเกิดข้อผิดพลาด ให้หยุดการตรวจสอบ
    if (error) {
      setIsChecking(false);
      return;
    }

    // ถ้า user ไม่ล็อกอิน ให้ redirect ไปที่หน้า sign in
    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    if (user) {
      // สามารถตรวจสอบ user_role ได้ที่นี่ด้วย
      if (user.user_role === 'admin') {
        // logic for admin
      } else if (user.user_role === 'user') {
        // logic for user
      }
      setIsChecking(false);
      return;
    }

    // ถ้า user ล็อกอินแล้ว ให้หยุดการตรวจสอบ
    setIsChecking(false);
  }, [isLoading, user, error, router]);

  React.useEffect(() => {
    checkPermissions().catch((err) => {
      logger.error('AuthGuard error:', err);
    });
  }, [checkPermissions]);

  // ถ้ายังตรวจสอบอยู่ (isChecking), แสดง null (หรือแสดง spinner/loading ตามต้องการ)
  if (isChecking || isLoading) {
    return null;
  }

  // ถ้ามี error ให้แสดงข้อผิดพลาด
  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  // ถ้าทุกอย่างโอเค ให้ render เนื้อหาของหน้า
  return <React.Fragment>{children}</React.Fragment>;
}
