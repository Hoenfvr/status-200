import * as React from 'react';
import type { Metadata } from 'next';
import Box, { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import ApproveTable from '@/components/admin/approve/approve-table';

// import { Budget } from '@/components/admin/approve/budget';
// import { LatestOrders } from '@/components/admin/approve/latest-orders';
// import { LatestProducts } from '@/components/admin/approve/latest-products';
// import { Sales } from '@/components/admin/approve/sales';
// import { TasksProgress } from '@/components/admin/approve/tasks-progress';
// import { TotalCustomers } from '@/components/admin/approve/total-customers';
// import { TotalProfit } from '@/components/admin/approve/total-profit';
// import { Traffic } from '@/components/admin/approve/traffic';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  if (typeof window !== 'undefined') {
    // Code ที่ทำงานเฉพาะฝั่ง client เท่านั้น
    console.log('Running on client side');
  } else {
    // Code ที่ทำงานฝั่ง server
    console.log('Running on server side');
  }

  return (
    <>
      <Typography sx={{pb:'30px'}} variant="h4" gutterBottom>
        Approve
      </Typography>
      <ApproveTable />
    </>
  );
}
