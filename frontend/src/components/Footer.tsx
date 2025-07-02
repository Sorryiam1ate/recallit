'use client';

import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: 'secondary.light',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center" sx={{ fontWeight: 300 }}>
          © {new Date().getFullYear()} Recallit. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
