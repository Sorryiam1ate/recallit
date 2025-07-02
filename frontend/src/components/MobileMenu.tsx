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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import '../styles/burger-menu.scss';

interface MobileMenuProps {
  menuItems: Array<{
    text: string;
    href: string;
  }>;
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
          <span className="burger-menu__line"></span>
          <span className="burger-menu__line"></span>
          <span className="burger-menu__line"></span>
        </div>
      </IconButton>

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
          },
        }}
        className={isOpen ? 'mobile-menu-enter-active' : 'mobile-menu-exit-active'}
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
        <List sx={{ px: 2 }}>
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
          <ListItem sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth onClick={toggleDrawer(false)}>
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
