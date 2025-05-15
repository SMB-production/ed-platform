import { AppBar, Toolbar, IconButton, Drawer, Button, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import { useCurrentUser } from '@/shared/api/queries/auth/authApi';
import { CompanyIcon } from '@/shared/icons';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#005343',
  padding: '10px 0',
  boxShadow: 'none',
});

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>

            <CompanyIcon onClick={() => navigate('/courses')} />

            {user && (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#366A75', color: '#fff' }}
                onClick={() => navigate('/profile')}
              >
                ЛК
              </Button>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
          },
        }}
      >
        <Box sx={{ width: '100%' }} p={2}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Sidebar />
        </Box>
      </Drawer>
    </>
  );
};
