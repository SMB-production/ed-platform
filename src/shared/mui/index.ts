import { createTheme } from '@mui/material';
import { shape } from './shape';
import { typography } from './typography';
import { palette } from './palette';
import { components } from './components';

export const theme = createTheme({
  typography,
  palette,
  shape,
  components,
});

export const styledTheme = {
  ...theme,
  color: {
    'Neutral/Neutral 50': theme.palette.grey[500],
    'Primary/Primary 70': theme.palette.primary.main,
  },
};

export type AppTheme = typeof styledTheme;
