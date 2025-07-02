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
    background: {
      default: '#E8EDF2',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'var(--font-lexend)',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#E8EDF2',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: '960px !important',
        },
      },
    },
  },
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#E8EDF2',
        }}
      >
        <Header />
        <Toolbar />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
            maxWidth: '960px !important',
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
