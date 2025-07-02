'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
  Backdrop,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/burger-menu.scss';

interface MobileMenuProps {
  menuItems: Array<{
    text: string;
    href: string;
  }>;
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false);
        setBackdropVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    setBackdropVisible(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setBackdropVisible(false);
    }, 300);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, mr: { xs: 1, sm: 2 } }}
      >
        <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
          <span className="burger-menu__line"></span>
          <span className="burger-menu__line"></span>
          <span className="burger-menu__line"></span>
        </div>
      </IconButton>

      <Backdrop
        open={backdropVisible}
        sx={{
          zIndex: theme => theme.zIndex.drawer - 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={toggleDrawer(false)}
        transitionDuration={500}
      />

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '300px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
            px: { xs: 0, sm: 0 },
          },
        }}
        className={isOpen ? 'mobile-menu-enter-active' : 'mobile-menu-exit-active'}
        transitionDuration={{ enter: 300, exit: 300 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Link href="/" passHref onClick={toggleDrawer(false)}>
            <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
          </Link>
        </Box>

        <List sx={{ px: { xs: 2, sm: 3 } }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={toggleDrawer(false)}
                sx={{ py: 1.5 }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-lexend)',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ mt: 3, px: { xs: 0, sm: 0 } }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: '20px',
                py: 1,
                fontWeight: 500,
                boxShadow: 'none',
                backgroundColor: '#f2f2f2',
                color: '#333',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
