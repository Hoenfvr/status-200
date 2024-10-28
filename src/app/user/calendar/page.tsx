import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import Calendar from '@/components/user/calendar/calendar-mock';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {

  return (
    <>
      <Typography variant="h4">Calendar</Typography>
      <Calendar />
    </>
  );
}

