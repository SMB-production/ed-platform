import { Components, Theme } from '@mui/material/styles';
import { forwardRef } from 'react';
import { LinkProps } from '@mui/material/Link';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
  },
);

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    // styleOverrides: `
    //     @font-face {
    //       font-family: 'Inter';
    //       font-style: normal;
    //       font-display: swap;
    //       font-weight: 400;
    //       src: local('Inter'), local('Inter-Regular'), url(${Inter}) format('ttf');
    //       unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //     }
    //   `,
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      variant: 'contained',
      color: 'primary',
      sx: {
        height: 'fit-content',
      },
    },
  },

  MuiPaper: {
    defaultProps: {
      sx: {
        display: 'flex',
        gap: '12px',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    } as LinkProps,
  },
  MuiTab: {
    defaultProps: {
      component: LinkBehavior,
    },
  },
  MuiList: {
    defaultProps: {
      disablePadding: true,
    },
  },
  MuiListItem: {
    defaultProps: {
      disablePadding: true,
    },
  },
  MuiDrawer: {
    defaultProps: {
      transitionDuration: 500,
      anchor: 'right',
      sx: {
        zIndex: 1300,
        '& .MuiDrawer-paper': {
          width: '40vw',
        },
      },
    },
  },

  MuiSnackbar: {
    defaultProps: {
      autoHideDuration: 3000,
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    },
  },
};
