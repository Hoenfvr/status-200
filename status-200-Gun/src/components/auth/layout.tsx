import * as React from 'react';
import Image from 'next/image'; // นำเข้า Image จาก Next.js
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <Box
        sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', flexDirection: 'column', bgcolor: '#1F262D' }}
      >
        <Box sx={{ p: 3, pt: 15 }}>
          <Image src="/assets/image/LOGO-Mut.png" alt="LOGO-Mut" width={300} height={120} />
          {/* <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box> */}
        </Box>
        <Box>
          <Typography color="#fff" variant="h3">
            MUT RESERVE MEETING ROOM
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </>
  );
}
