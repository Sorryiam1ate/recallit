'use client';

import { ThemeProvider, createTheme, CssBaseline, Box, Container, Toolbar } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f2f2f2',
    },
  },
  typography: {
    fontFamily: 'var(--font-lexend)',
    button: {
      textTransform: 'none',
    },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        component="div"
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}
      >
        <Header />
        <Toolbar />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }} maxWidth="lg">
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
