'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid #e0e0e0' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          LOGO
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography sx={{ fontWeight: 500 }}>Home</Typography>
            </Link>
            <Link href="/modules" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography sx={{ fontWeight: 500 }}>Modules</Typography>
            </Link>
          </Box>
          <Button variant="contained" color="primary" size="medium">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
