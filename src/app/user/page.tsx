import * as React from 'react';
import type { Metadata } from 'next';
import Box, { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import Calendar from '@/components/user/calendar/calendar-mock';

export default function Page(): React.JSX.Element {

  // ชุดโค้ดทดสอบการทำงานของ client และ server
  // if (typeof window !== 'undefined') {
  //   // Code ที่ทำงานเฉพาะฝั่ง client เท่านั้น
  //   console.log('Running on client side');
  // } else {
  //   // Code ที่ทำงานฝั่ง server
  //   console.log('Running on server side');
  // }

  return (
    <>
      <Typography sx={{ pb: '30px' }} variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Calendar />
    </>
  );
}
