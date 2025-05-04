import { ReactQueryProvider } from '@/shared/api';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/shared/mui';

export const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>hello world!</SnackbarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
