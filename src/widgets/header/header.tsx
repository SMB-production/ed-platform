import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCurrentUser } from '@/shared/api/queries/auth/authApi.ts';
import { CompanyIcon } from '@/shared/icons';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#005343',
  padding: '10px 0',
  boxShadow: 'none',
});

const AccountButton = styled(Button)({
  backgroundColor: '#366A75',
  color: '#fff',
  marginLeft: 15,
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: '#59B29C',
  },
});

export const Header = () => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CompanyIcon />

          {user && (
            <AccountButton variant="contained" size="small" onClick={() => navigate('/profile')}>
              Личный кабинет
            </AccountButton>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
