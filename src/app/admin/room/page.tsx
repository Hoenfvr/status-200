import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/admin/calendar/account-details-form';
import { AccountInfo } from '@/components/admin/calendar/account-info';
import RoomManagement from '@/components/admin/room/room-management';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack sx={{pb:'30px'}} spacing={3}>
      <div>
        <Typography variant="h4">Room Management</Typography>
      </div>
      <RoomManagement />
    </Stack>
  );
}
