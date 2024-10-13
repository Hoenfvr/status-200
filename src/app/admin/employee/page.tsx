import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { Notifications } from '@/components/admin/room/notifications';
import { UpdatePasswordForm } from '@/components/admin/room/update-password-form';
import EmployeeManagement from '@/components/admin/employee/employee-management';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
        <Typography variant="h4">Employee Management</Typography>
      <EmployeeManagement/>
    </Stack>
  );
}
