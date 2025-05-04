import { ReactQueryProvider } from '@/shared/api';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/shared/mui';
import { AppRouter } from '@/app/routing.tsx';

export const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
