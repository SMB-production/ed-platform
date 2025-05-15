import { ReactQueryProvider } from '@/shared/api';
import { SnackbarProvider } from 'notistack';
import { theme } from '@/shared/mui';
import { AppRouter } from '@/app/routing.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '@/app/providers/AuthProvider.tsx';
import '@/shared/mui/fonts/fonts.css';

export const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
