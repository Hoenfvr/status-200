import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { checkSession } = useUser();
  const router = useRouter();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    setIsPending(true); // ตั้งค่าการโหลด

    try {
      const { error } = await authClient.signOut();

      if (error) {
        logger.error('Sign out error', error);
        setIsPending(false); // ยกเลิกการโหลดเมื่อมีข้อผิดพลาด
        return;
      }

      await checkSession?.(); // ตรวจสอบเซสชันของผู้ใช้ใหม่

      // นำทางไปยังหน้าเข้าสู่ระบบ
      router.push(paths.auth.signIn);
    } catch (err) {
      logger.error('Sign out error', err);
    } finally {
      setIsPending(false); // ยกเลิกการโหลด
    }
  }, [checkSession, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">User</Typography>
        <Typography color="text.secondary" variant="body2">
          User11
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleSignOut} disabled={isPending}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          {isPending ? 'Signing out...' : 'Sign out'}
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
