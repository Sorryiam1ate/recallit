'use client';

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Modules', href: '/modules' },
  ];

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: 'white' }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{item.text}</Typography>
                </Link>
              ))}
            </Box>
            <Button variant="contained" color="primary" size="medium">
              Login
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileMenu menuItems={menuItems} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
