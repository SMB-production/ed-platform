import { styled } from '@mui/material/styles';
import { CompanyIcon } from '@/shared/icons';

const HeaderContainer = styled('header')({
  backgroundColor: '#005343',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  padding: '10px 20px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Header = () => {
  return (
    <HeaderContainer>
      <CompanyIcon />
    </HeaderContainer>
  );
};
