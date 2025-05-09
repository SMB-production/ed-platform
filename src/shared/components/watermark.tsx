import { Box, Typography } from '@mui/material';

export const Watermark = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-30deg)',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '5vw',
          fontWeight: 600,
          color: '#000',
          whiteSpace: 'nowrap',
        }}
      >
        Developed by @DanilGrb
      </Typography>
    </Box>
  );
};
