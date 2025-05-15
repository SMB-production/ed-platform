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
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          padding: '8px',
        },
        [theme.breakpoints.down(800)]: {
          padding: '8px',
        },
      }),
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
  MuiTableCell: {
    styleOverrides: {
      root: {
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
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
