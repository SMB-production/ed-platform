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
