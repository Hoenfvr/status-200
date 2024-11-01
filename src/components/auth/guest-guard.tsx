'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      if (user.user_type === 'admin') {
        logger.debug('[GuestGuard]: Admin user logged in, redirecting to admin approve');
        router.replace(paths.admin.approve);
      } else if (user.user_type === 'user') {
        logger.debug('[GuestGuard]: Regular user logged in, redirecting to user calendar');
        router.replace(paths.user.calendar);  // Update to the path where regular users should go
      }
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  // if (isChecking) {
  //   return null;
  // }

  // if (error) {
  //   return <Alert color="error">{error}</Alert>;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}